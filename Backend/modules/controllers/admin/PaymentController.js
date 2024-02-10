import Controller from '../Controller.js';

export default new class PaymentController extends Controller {
 async editPrice(req, res) {
        try {
            let listFields = {};
            if (req.body.price) { listFields.price = req.body.price }
            const result = await this.model.Price.findByIdAndUpdate(req.params.id, listFields);
            if (result) {
                return res.json({
                    data: 'ویرایش شد',
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

    async addPrice(req, res) {
        try {
            const doc = await this.model.Price({
                price: req.body.price,
            });
            await doc.save();
            return res.json({data: 'ثبت شد', success: true });
        }
        catch (err) {
            res.json({ data: 'err', success: false });
        }
    }

    async getPrices(req, res) {
        try {
            const result = await this.model.Price.find();
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
    
      async getPayments(req, res) {
        try {
            const result = await this.model.Payment.find().populate('User Reserve');
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
    this.model.Payment.findOne({ userID: req.body.userID, statusPayment: 'موفق' }, (err, Payment) => {
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