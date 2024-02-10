import Controller from '../Controller.js';
import { generate } from 'randomstring';

export default new class ReserveController extends Controller {
    async getReservesByUser(req, res) {
        try {
            const result = await this.model.Reserve.find({userID:req.params.id}).populate('User', 'fullName');
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

    async editReserve(req, res) {
        try {
            let listFields = {};
            if (req.body.reason) { listFields.reason = req.body.reason }
            if (req.body.docType) { listFields.docType = req.body.docType }
            if (req.body.consultationType) { listFields.consultationType = req.body.consultationType }
            if (req.body.visitDate) { listFields.visitDate = req.body.visitDate }
            if (req.body.visitTime) { listFields.visitTime = req.body.visitTime }
            const result = await this.model.Reserve.findByIdAndUpdate(req.params.id, listFields);
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

    async addReserve(req, res) {
        try {
            const doc = await this.model.Reserve({
               code:generate({charset: '123456789', length: 5}),
                userID: req.body.userID,
                reason: req.body.reason,
                docType: req.body.docType,
                consultationType: req.body.consultationType,
                visitDate: req.body.visitDate,
                visitTime: req.body.visitTime,
                time: req.body.time,
                date: req.body.date,
            });
            await doc.save();
            return res.json({id:doc._id, data: 'ثبت شد', success: true });
        }
        catch (err) {
            res.json({ data: 'err', success: false });
        }
    }

    async deleteReserve(req, res) {
        try {
            const result = await this.model.Reserve.findByIdAndDelete(req.params.id);
            if (result) {
                return res.json({
                    data: 'حذف شد',
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

}
