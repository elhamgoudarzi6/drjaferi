import Controller from '../Controller.js';
import { generate } from 'randomstring';

export default new class ReserveController extends Controller {

    async getReserves(req, res) {
        try {
            const result = await this.model.Reserve.find().populate('User', 'fullName mobile');
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
            if (req.body.title) { listFields.title = req.body.title }
            if (req.body.number) { listFields.number = req.body.number }
            if (req.body.description) { listFields.description = req.body.description }
            if (req.body.files) { listFields.files = req.body.files }
            if (req.body.status) { listFields.status = req.body.status }
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
                code: generate({ charset: '123456789', length: 5 }),
                userID: req.body.userID,
                title: req.body.title,
                number: req.body.number,
                description: req.body.description,
                files: req.body.files,
            });
            await doc.save();
            return res.json({ data: 'ثبت شد', success: true });
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



//const result = await this.model.Order.find().populate({ path: 'User', match: { mobile: '09168509001' }, select: 'fullName mobile' });
