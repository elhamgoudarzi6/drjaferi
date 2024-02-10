import Controller from '../Controller.js';
import request from 'request-promise';

export default new class PaymentController extends Controller {

  payment(req, res) {
    let params = {
      merchant_id: '548ed6b2-b5c3-4dc9-9f90-dcd2e3b415f9',
      amount: req.body.price,
      callback_url: 'https://drjaferi.ir/reserve/result?price=' + req.body.price,
      description: 'پرداخت حق مشاوره',
    };
    let options = {
      method: 'POST',
      uri: 'https://api.zarinpal.com/pg/v4/payment/request.json',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: params,
      json: true,
    };
    request(options).then(result => {
      if (result.data.code === 100) {
        const doc = this.model.Payment({
          userID: req.body.userID,
          reserveID: req.body.reserveID,
          resNumber: result.data.authority,
          price: req.body.price,
          date: req.body.date,
          time: req.body.time,
        });
        doc.save();
      }
      return res.json({
        data: `https://www.zarinpal.com/pg/StartPay/${result.data.authority}`,
        sucess: true
      })
    }).catch(err => res.json(err.message));

  }

  verifyPayment(req, res) {
    let params = {
      merchant_id: '548ed6b2-b5c3-4dc9-9f90-dcd2e3b415f9',
      amount: req.body.price,
      authority: req.body.authority,
    };
    let options = {
      method: 'POST',
      uri: 'https://api.zarinpal.com/pg/v4/payment/verify.json',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: params,
      json: true,
    };
    request(options).then((result) => {
      if (result.data.code === 100 || result.data.code === 101) {
        this.model.Payment.updateOne({ resNumber: req.body.authority }, { status: 'موفق', refID: result.data.ref_id }).exec();
        return res.json({ data: result, success: true })
      }
    }).catch(()=> {
        return res.json({ data: 'err', success: false })
    });

  }

    async getPaymentsByUser(req, res) {
        try {
            const result = await this.model.Payment.find({userID:req.params.id}).populate('User Reserve');
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'یافت نشد',
                success: false
            });
        } catch (err) {
            console.log(err.message);
        }

    }
    
  checkStatePayment(req, res) {
    this.model.Payment.findOne({ userID: req.body.userID, status: 'موفق' }, (err, Payment) => {
      if (err) throw err;
      if (Payment) {
        return res.json({
          data: Payment,
          success: true
        });
      }
      else {
        return res.json({
          data: Payment,
          success: false
        });
      }
    })
  }


  trackingPayment(req, res) {
    this.model.Payment.findOne({ resNumber: req.body.resNumber }, (err, Payment) => {
      if (err) throw err;
      if (Payment) {
        return res.json({
          data: Payment,
          success: true
        });
      }
      res.json({
        data: 'یافت نشد',
        success: false
      })
    })
  }
}