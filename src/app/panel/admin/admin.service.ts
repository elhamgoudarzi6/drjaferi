import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://api.drjaferi.ir/admin/';

  constructor(private http: HttpClient) { }

  sendSms(data: any): any {
    const headers = {
      'X-API-KEY': 'OEib74WVGhsSmthSz121cpOPdvMCnbfabHKdGRUh6ACQwY9II4kTBksqVIPlneEz',
      'Content-Type': 'application/json',
      'ACCEPT': 'text/plain'
    };
    return this.http.post('https://api.sms.ir/v1/send/verify', data, { 'headers': headers });
  }
  upload(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  multiUpload(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }


  login(data: any): any {
    return this.http.post(this.baseUrl + 'login', data);
  }

  getUsers(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getUsers', { params });
  }

  getReserves(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getReserves', { params });
  }

  getPayments(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getPayments', { params });
  }

  deleteReserve(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteReserve/' + id, { params });
  }

  addFaq(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addFaq', data, { params });
  }

  editFaq(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editFaq/' + id, data, { params });
  }

  addPrice(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addPrice', data, { params });
  }

  editPrice(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editPrice/' + id, data, { params });
  }
  getPrices(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getPrices', { params });
  }
  deleteFaq(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteFaq/' + id, { params });
  }
  getFaqs(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getFaqs', { params });
  }
  getContactMessages(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getContactMessages', { params });
  }
  deleteContactMessage(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteContactMessage/' + id, { params });
  }
  authUser(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'authUser', data, { params });
  }
  addOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addOrder', data, { params });
  }

  addGallery(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addGallery', data, { params });
  }
  deleteGallery(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteGallery/' + id, { params });
  }
  getGallery(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getGallery', { params });
  }
  editGallery(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editGallery/' + id, data, { params });
  }

  editUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editUser/' + id, data, { params });
  }
  editOrder(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editOrder/' + id, data, { params });
  }
  deleteUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteUser/' + id, { params });
  }
  deletePlan(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deletePlan/' + id, { params });
  }
  editPlan(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editPlan/' + id, data, { params });
  }
  getPlans(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getPlans', { params });
  }
  deleteFile(data: any): any {
    return this.http.post(this.baseUrl + 'deleteFile', data);
  }
  addPlan(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addPlan', data, { params });
  }

  //#region Admins
  getAdmins(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAdmins', { params });
  }
  addAdmin(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addAdmin', data, { params });
  }
  editAdmin(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editAdmin/' + id, data, { params });
  }
  deleteAdmin(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteAdmin/' + id, { params });
  }
  //#endregion



}
