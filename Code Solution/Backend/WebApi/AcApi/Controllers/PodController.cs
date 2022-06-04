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

            //try
            //{
            //    if (pod.ExistPod(param.PODNr))
            //    {
                  


            //        ret.ResultCode = 1;
            //        ret.ResultDescription = "Ky Pod eshte i rregjistruar njehere";
            //        return ret;
            //    }

            //    podValidate = pod.Validate(param);

            //    if ( podValidate==null)
            //    {
            //        ret = pod.SavePOD(param);
            //    }
            //    else
            //    {

            //        ret.ResultCode = 1;
            //        ret.ResultDescription = "Error" ;
            //        ret.Error = podValidate;
            //        return ret;
            //    }
             

            //}
            //catch (Exception ex)
            //{
            //    ret = new PodSaveRes();

            //    ret.ResultCode = 1;
            //    string strError = ex.Message;


            //    if (ex.InnerException != null)
            //    {
            //        strError += ex.InnerException.Message;
            //    }


            //    return ret;
            //}

            return ret;

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
                    //ret = pod.NdryshoPassword(param);
                  
                    //return ret;

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
        [Route("api/POD/VerifikoCante")]
        public bool VerifikoCante(HapVerifikoCanteReq param)
        {
            bool ret;

            try
            {


                

                ret = pod.VerifikoCante(param.CantaKodi);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }


        [HttpPost]
        [Route("api/POD/VerifikoPodeneCante")]
        public bool VerifikoPodeneCante(HapVerifikoCanteReq param)
        {
            bool ret;

            try
            {
               
                ret = pod.VerifikoPodeneCante(param.NrPod, param.CantaKodi);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }


        [HttpPost]
        [Route("api/POD/DailyRaport")]
        public DailyRaportRes DailyRaport()
        {
            DailyRaportRes ret = new DailyRaportRes();

            try
            {
                
                ret = pod.DailyRaport();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ret;
        }

        



    }
}
