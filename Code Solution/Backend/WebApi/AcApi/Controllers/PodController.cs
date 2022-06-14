using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity.Core.Objects;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using AcApi.Models.Request;

using AcApi.Models.Response;
using AcApi.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AcApi.Controllers
{
 
    public class PodController : ApiController
    {
        private readonly Pod pod;

        public PodController()
        {
            this.pod = new Pod();
        }

       [HttpPost]
        [Route("api/POD/SaveNewPODKS")]
        public PodSaveRes SaveNewPodKS([FromBody]PodSaveReq param)
        {
            PodSaveRes ret = new PodSaveRes();

            string[] podValidate = new string[20];

            try
            {
                if (pod.ExistPod(param.PODNr))
                {



                    ret.ResultCode = 1;
                    ret.ResultDescription = "Ky Pod eshte i rregjistruar njehere";
                    return ret;
                }

                podValidate = pod.Validate(param);

                if (podValidate == null)
                {
                    ret = pod.SavePOD(param);
                }
                else
                {

                    ret.ResultCode = 1;
                    ret.ResultDescription = "Error";
                    ret.Error = podValidate;
                    return ret;
                }


            }
            catch (Exception ex)
            {
                ret = new PodSaveRes();

                ret.ResultCode = 1;
                string strError = ex.Message;


                if (ex.InnerException != null)
                {
                    strError += ex.InnerException.Message;
                }


                return ret;
            }

            return ret;

        }

        [HttpPost]
        [Route("api/POD/City")]
        public List<string> GetCity()
        {
            List<string> ret = null;

            try
            {

                //ret = pod.TransactionLog(param);
                ret = pod.GetCity();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }

        [HttpPost]
        [Route("api/POD/FullStates")]
        public List<string> FullStates()
        {
            List<string> ret = new List<string>();



            try
            {
                ret = pod.GetFullStates();
                ret.Add("Te Gjitha");


            }
            catch (Exception ex)
            {


                //ret.ResultCode = 1;
                string strError = ex.Message;


                if (ex.InnerException != null)
                {
                    //ret += ex.InnerException.Message + strError;
                }


                return ret;
            }

            return ret;

        }


        [HttpPost]
        [Route("api/POD/GetKodePershkrimi")]
        public List<string> GetKodePershkrmi()
        {
            List<string> ret = new List<string>();



            try
            {
                ret = pod.GetKodPershkrimi();
                ret.Add("Te Gjitha");


            }
            catch (Exception ex)
            {


                //ret.ResultCode = 1;
                string strError = ex.Message;


                if (ex.InnerException != null)
                {
                    //ret += ex.InnerException.Message + strError;
                }


                return ret;
            }

            return ret;

        }

        [HttpPost]
        [Route("api/POD/GetKodLevizje")]
        public List<string> GetKodLevizje()
        {
            List<string> ret = new List<string>();



            try
            {
                ret = pod.GetKodeLevizje();
                //  ret.Add("Te Gjitha");


            }
            catch (Exception ex)
            {


                //ret.ResultCode = 1;
                string strError = ex.Message;


                if (ex.InnerException != null)
                {
                    //ret += ex.InnerException.Message + strError;
                }


                return ret;
            }

            return ret;

        }

        [HttpPost]
        [Route("api/POD/GetKodLevizjeNew")]
        public List<string> GetKodLevizjeNEW()
        {
            List<string> ret = null;

            try
            {

                ret = pod.GetKodLevizje();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }


        [HttpPost]
        [Route("api/POD/GetKodLevizjeBrand")]
        public List<string> GetKodLevizjeBrand([FromBody] PodSaveReq param)
        {
            List<string> ret = null;

            try
            {

                ret = pod.GetKodLevizjeBrand(param.KodLevizje);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }

        [HttpPost]
        [Route("api/POD/GetKodLevizjeDrejtim")]
        public List<string> GetKodLevizjeDrejtim([FromBody] PodSaveReq param)
        {
            List<string> ret = null;

            try
            {

                ret = pod.GetKodLevizjeDrejtim(param.KodLevizje);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }

        [HttpPost]
        [Route("api/POD/GetKodLevizjeShtese")]
        public List<string> GetKodLevizjeShtese([FromBody] PodSaveReq param)
        {
            List<string> ret = null;

            try
            {

                ret = pod.GetKodLevizjeShtese(param.KodLevizje);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }

        [HttpPost]
        [Route("api/POD/GetKodLevizjeMenyra")]
        public List<string> GetKodLevizjeMenyra([FromBody] PodSaveReq param1)
        {
            List<string> ret = null;

            try
            {

                ret = pod.GetKodLevizjeMenyra(param1.KodLevizjeBrand);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }

        [HttpPost]
        [Route("api/POD/GetKorrierGrumbullime")]
        public List<string> GetKorrierGrumbullime([FromBody] PodSaveReq param)
        {
            List<string> ret = null;

            try
            {

                ret = pod.GetKorrierGrumbullime(param.AgjensiaOrigjineID);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }

        [HttpPost]
        [Route("api/POD/GetShtesaCmim")]
        public List<string> GetShtesaCmim([FromBody] PodSaveReq param)
        {
            List<string> ret = null;

            try
            {

                ret = pod.GetShtesaCmim();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }

        [HttpPost]
        [Route("api/POD/LlogaritCmiminTotal")]
        public List<string> LlogaritCmiminTotal([FromBody] PodSaveReq param)
        {
            List<string> rsp = new List<string>();



            try
            {
                rsp.Clear();
                rsp = pod.LlogaritCmiminTotal(param);
                
                
                //return ret;

            }
            catch (Exception ex)
            {


                // ret. = 1;
                string strError = ex.Message;
                if (ex.InnerException != null)
                {

                    strError += ex.InnerException.Message;
                    rsp.Clear();
                    rsp.Add("0");
                    rsp.Add("0");
                    rsp.Add("0");
                    rsp.Add("0");
                }


                return rsp;
            }


            return rsp;


        }



        [HttpPost]
        [Route("api/POD/TransactionLogGrumbullime")]
        public BindingList<TransactionLogGrumbullime> TransactionLogGrumbullime([FromBody]CriteriaTransLogGrumbullimParam param)
        {

            BindingList<TransactionLogGrumbullime> ret = null;

            try
            {

                //ret = pod.TransactionLog(param);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;


        }


        

        [HttpPost]
        [Route("api/POD/CityKS")]
        public List<string> GetCityKS()
        {
            List<string> ret = null;

            try
            {

                //ret = pod.GetCityKS();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }

        //Gjurmo
        //[HttpPost]
        //[Route("api/POD/Gjurmo")]
        //public BindingList <GjurmoResp> Gjurmo([FromBody] BaseReq param)
        //{
 

        //    List<POD_VIEW_LOAD> ret = new List<POD_VIEW_LOAD>();

        //    BindingList<GjurmoResp> ret2 = new BindingList<GjurmoResp>();
        //    if (param.nrKodi != "")

        //    try
        //    {
        //           // ret = pod.GetParam(param.nrKodi);
        //            ret2= pod.Gjurmo(param.nrKodi);
                   
        //        //return ret;

        //        }
        //    catch (Exception ex)
        //    {
        //        ret = new List<POD_VIEW_LOAD>(); 
          

        //        string strError = ex.Message;
        //        if (ex.InnerException != null)
        //        {
        //            strError += ex.InnerException.Message;
        //        }


        //        return ret2;
        //    }


        //    return ret2;
        //    //return pod.SavePOD(param);


        //}

        [HttpPost]
        [Route("api/POD/ndrysho/password")]
        public PodSaveRes NdryshoPass([FromBody] NdryshoPassReq param)
        {
            PodSaveRes ret = new PodSaveRes();

            
            if (param.KsID != "")

                try
                {


                    ret = pod.NdryshoPassword(param);
                  
                    return ret;

                }
                catch (Exception ex)
                {
                    ret = new PodSaveRes();

                    ret.ResultCode = 1;
                    string strError = ex.Message;
                    if (ex.InnerException != null)
                    {
                       
                        strError += ex.InnerException.Message;
                    }


                    return ret;
                }


            return ret;
        

        }

        [HttpPost]
        [Route("api/POD/KrijoCante")]
        public BaseRes KrijoCante(KrijoCanteReq param)
        {


            BaseRes resp = new BaseRes();


            try
            {


                resp = pod.KrijoCante(param);



            }
            catch (Exception ex)
            {


                //ret.ResultCode = 1;
                string strError = ex.Message;


                if (ex.InnerException != null)
                {
                    resp.ResultMessage += ex.InnerException.Message + strError;
                }


                return resp;
            }

            return resp;

        }

        [HttpPost]
        [Route("api/POD/GjeneroPodCante")]
        public string GjeneroPodCante()
        {
            string nrPod = "";



            try
            {
                nrPod = pod.GjeneroPodCante();

                //return ret;

            }
            catch (Exception ex)
            {


                // ret. = 1;
                string strError = ex.Message;
                if (ex.InnerException != null)
                {

                    strError += ex.InnerException.Message;
                }


                return "";
            }


            return nrPod;


        }

        [HttpPost]
        [Route("api/POD/GetKodData")]
        public List<PodUpdateReq> UpdatePod([FromBody] BaseReq param)
        {
            List<PodUpdateReq> ret = new List<PodUpdateReq>();


            if (param.nrKodi != "")

                try
                {
                    ret = pod.GetPod(param.nrKodi);


                    //return ret;

                }
                catch (Exception ex)
                {
                    ret = new List<PodUpdateReq>();

                    // ret. = 1;
                    string strError = ex.Message;
                    if (ex.InnerException != null)
                    {

                        strError += ex.InnerException.Message;
                    }


                    return ret;
                }


            return ret;


        }

        [HttpPost]
        [Route("api/POD/GetAgjensi")]
        public List<string> GetAgjensi()
        {
            List<string> ret = new List<string>();



            try
            {
                ret = pod.GetAgjensi();
                ret.Add("Te Gjitha");


            }
            catch (Exception ex)
            {


                //ret.ResultCode = 1;
                string strError = ex.Message;


                if (ex.InnerException != null)
                {
                    //ret += ex.InnerException.Message + strError;
                }


                return ret;
            }

            return ret;

        }
        
        [HttpPost]
        [Route("api/POD/HapCante")]
        public BaseRes HapCante(HapVerifikoCanteReq param)
        {


            BaseRes resp = new BaseRes();


            try
            {


                resp = pod.HapCante(param);



            }
            catch (Exception ex)
            {


                //ret.ResultCode = 1;
                string strError = ex.Message;


                if (ex.InnerException != null)
                {
                    resp.ResultMessage += ex.InnerException.Message + strError;
                }


                return resp;
            }

            return resp;

        }

        [HttpPost]
        [Route("api/POD/VerifikoCantaPode")]
        public List<ResponseVerifikoCante> VerifikoCantaPode(HapVerifikoCanteReq param)
        {


            List<ResponseVerifikoCante> resp = new List<ResponseVerifikoCante>();



            BaseRes ret = new BaseRes();
            BaseRes ret2 = new BaseRes();
            try
            {
                if (pod.CheckIsCantaHapur(param))
                {

                    if (param.NrPod.Length == 0)
                    {
                        ResponseVerifikoCante res = new ResponseVerifikoCante();
                        res.Result = true;
                        res.ResultMessage = "Canta u verifikua me sukses!";
                        resp.Insert(0, res);
                    }
                    for (int i = 0; i < param.NrPod.Length; i++)
                    {
                        ResponseVerifikoCante res = new ResponseVerifikoCante();

                        ret = pod.VerifikoCante(param.NrPod[i],param.CantaKodi);
                        if (ret.Result == true)
                        {

                            res.NrPod = param.NrPod[i];
                            res.Result = true;
                            res.ResultMessage = ret.ResultMessage;
                            res.Verifikim = "OK";
                            resp.Add(res);

                        }
                        else
                        {
                            res.NrPod = param.NrPod[i];
                            res.Result = true;
                            res.ResultMessage = ret.ResultMessage;
                            res.Verifikim = "Pa Verifikuar";
                            resp.Add(res);

                        }
                    }

                }
                else
                {
                    ResponseVerifikoCante res = new ResponseVerifikoCante();
                    res.Result = false;
                    res.ResultMessage = "Kujdes! Nuk mund te verifikoni nje cante e cila nuk eshte hapur nga agjensia juaj.";
                    resp.Add(res);
                }

            }
            catch (Exception ex)
            {
                ResponseVerifikoCante res = new ResponseVerifikoCante();

                //ret.ResultCode = 1;
                string strError = ex.Message;

                if (ex.InnerException != null)
                {
                    res.ResultMessage += ex.InnerException.Message + strError;
                }

                resp.Add(res);

                return resp;
            }

            return resp;

        }
        
        [HttpPost]
        [Route("api/POD/Dorezo")]
        public BaseRes SaveNewPodKS([FromBody] DorezoPodReq param)
        {
            BaseRes ret = new BaseRes();



            try
            {
                ret = pod.DorezoPod(param);

            }
            catch (Exception ex)
            {
                ret = new PodSaveRes();

                //ret.ResultCode = 1;
                string strError = ex.Message;
                ret.ResultMessage += strError;

                if (ex.InnerException != null)
                {
                    ret.ResultMessage += ex.InnerException.Message + strError;
                }


                return ret;
            }

            return ret;

        }

        [HttpPost]
        [Route("api/POD/GetKod")]
        public BaseRes GetKod(DorezoPodReq param)
        {
            string ret = "";

            BaseRes resp = new BaseRes();

            try
            {
                ret = pod.GetKorrier(param.PodKodi);


                if (ret != "")
                {

                    resp.Result = true;
                    resp.ResultMessage = ret;
                }

                else
                {

                    resp.Result = false;
                    resp.ResultMessage = "Error !";
                }
            }
            catch (Exception ex)
            {


                //ret.ResultCode = 1;
                string strError = ex.Message;


                if (ex.InnerException != null)
                {
                    resp.ResultMessage += ex.InnerException.Message + strError;
                }


                return resp;
            }

            return resp;

        }
        [HttpPost]
        [Route("api/POD/GetArsye")]
        public List<string> GetArsye()
        {
            List<string> ret = null;

            try
            {

                ret = pod.GetArsye();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }
        
        [HttpPost]
        [Route("api/POD/GetUserForAdmin")]
        public BindingList<UserInfoRes> GetUserForAdmin(BaseReq param)
        {
            BindingList<UserInfoRes> ret = null;

            try
            {

                ret = pod.GetUserForAdmin(param.nrKodi);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }
        


    }
}
