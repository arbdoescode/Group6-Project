using System;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using AcApi.Models;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using AcApi.Services;
using AcApi.Models.Response;
using AcApi.Models.Request;

namespace AcApi.Middleware
{
    public class UserKeyValidatorsModule : IHttpModule
    {
        Group6DBEntities dbContext = new Group6DBEntities();

        private object app;

        #region Key
        public string GetKey(string pUserName)
        {
            string res = "";

            var ret = dbContext.Token_AGJ
                                       .Where
                                       (
                                            e => e.USERNAME == pUserName
                                       )
                                       .Select(e => e.KEY);


            if (ret == null)
            {
                return "";
            }

            if (ret.Count() == 0)
            {
                return "";
            }


            res = ret.FirstOrDefault<string>();

            return res;

        }

        public string GetKeyToday(string pUserName)
        {
            string res = "";

            DateTime dtMaxToday = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour - 4, DateTime.Now.Minute, 59, 999);


            var ret = dbContext.Token_AGJ
                                       .Where
                                       (
                                            e => e.USERNAME == pUserName && e.DATETIME >= dtMaxToday

                                       )
                                       .Select(e => e.KEY);


            if (ret == null)
            {
                return "";
            }

            if (ret.Count() == 0)
            {
                return "";
            }


            res = ret.FirstOrDefault<string>();

            return res;

        }

        //private string GetBody(HttpContext context)
        //{
        //    var body = new StreamReader(context.Request.InputStream).ReadToEnd().TrimEnd();

        //    return body;

        //}

        //public string CalculateMD5(string strSecretKey)
        //{
        //    TimeZone time2 = TimeZone.CurrentTimeZone;
        //    DateTime dtTime = time2.ToUniversalTime(DateTime.Now);
        //    var timeZone = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time");
        //    var localTime = TimeZoneInfo.ConvertTimeFromUtc(dtTime, timeZone);

        //    TimeSpan span = localTime.Subtract(new DateTime(1970, 1, 1, 0, 0, 0));
        //    long totalSec = (long)span.TotalSeconds;

        //    string msg = totalSec.ToString();


        //    string strMD5 = CalculateHMACMd5(msg, strSecretKey);
        //    return strMD5;
        //}

        #region MD5
        //public long UnixTimeNow()
        //{
        //    //var timeSpan = (DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0));
        //    //return (long)timeSpan.TotalSeconds;


        //    TimeSpan span = DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1, 0, 0, 0));

        //    return (long)span.TotalSeconds;

        //}

        private string CalculateHMACMd5(string message, string key)
        {
            System.Text.ASCIIEncoding encoding = new System.Text.ASCIIEncoding();
            byte[] keyByte = encoding.GetBytes(key);
            //HMACMD5 hmacmd5 = new HMACMD5(keyByte);
            HMACSHA256 hmacmd5 = new HMACSHA256(keyByte);
            byte[] messageBytes = encoding.GetBytes(message);
            byte[] hashmessage = hmacmd5.ComputeHash(messageBytes);
            string HMACMd5Value = ByteToString(hashmessage);
            return HMACMd5Value;


        }


        #endregion
        public BaseRes IsValidToken(string requestToken, string pUserName, string hash)
        {
            //edmx datacontext
            BaseRes res = new BaseRes();
            bool ret = false;

            if (hash == null || hash == "")
            {
                res.ResultToken = "Token mungon!";
                res.Result = false;
                return res;

            }


            string key = GetKey(pUserName);
            long unTime = this.UnixTimeNow();

            for (long i = unTime - 420; i < unTime + 420; i++)
            {
                string tokenServerSide = CalculateHMACMd5(i.ToString(), key);
                string hash2 = hash.ToUpper();
                if (tokenServerSide == hash2)
                {
                    string str = tokenServerSide.ToLower();
                    ret = true;
                }

            }

            if (ret == true) {
                string tokenValid = this.GetKeyToday(pUserName);
                if (tokenValid == null || tokenValid.Count() == 0)
                {
                    res.ResultToken = "Token ka skaduar! Ju lutem logohuni serisht";
                    res.Result = false;
                    return res;
                }
            }
            else
            {
                res.Result = false;
                return res;
            }

            res.Result = true;
            return res;
        }

        public string SaveSecretKey(string strUsername)
        {
            string strVal = this.GetKeyToday(strUsername);
            if (strVal.Trim() != "")
            {
                return strVal.Trim();
            }

            BaseRes objRes = new BaseRes();

            //var strategy = _context.Database.CreateExecutionStrategy();

            string strToken = Guid.NewGuid().ToString();

            Token objToken = new Token();
            objToken.USERNAME = strUsername;
            objToken.KEY = strToken;
            objToken.DATETIME = DateTime.Now;
            //objToken.StatusToken = true;

            //await strategy.ExecuteAsync(async () =>
            //{
            //var transaction = dbContext.Database.BeginTransaction();
            //  {

            try
            {
                bool exist = dbContext.Token_AGJ.Any(e => e.USERNAME == strUsername);
                if (exist == true)
                {
                    // dbContext.Token_KS.Update(objToken);
                    var recordToUpdate = (from p in dbContext.Token_AGJ
                                          where p.USERNAME == strUsername
                                          select p).Single();
                    recordToUpdate.KEY = strToken;
                    recordToUpdate.DATETIME = DateTime.Now;


                }
                else
                {
                    var recordToInsert = (from p in dbContext.Token_AGJ
                                          where p.USERNAME == strUsername
                                          select p).Single();

                    recordToInsert.KEY = strToken;
                    objToken.USERNAME = strUsername;
                    objToken.DATETIME = DateTime.Now;

                }
                dbContext.SaveChanges();
                //dbContext.Commit();

                objRes.Result = true;
                objRes.ResultMessage = "Success";
                objRes.ResultMessageTotali = strToken;


            }
            catch (Exception ex)
            {


                objRes.Result = false;
                objRes.ResultMessage = "Failed create secret key";
                objRes.ResultMessageTotali = "";
                //transaction.Rollback();
            }

            return objRes.ResultMessageTotali;
        }
        #endregion

        public void Dispose()
        {
        }



        public void Init(HttpApplication application)
        {
            application.BeginRequest += (new EventHandler(this.Application_BeginRequest));
            application.EndRequest += (new EventHandler(this.Application_EndRequest));
        }

   

        private string GetBody(HttpContext context)
        {
            var body = new StreamReader(context.Request.InputStream).ReadToEnd().TrimEnd();

            return body;

        }


        #region MD5
        public long UnixTimeNow()
        {
            

            TimeSpan span = DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1, 0, 0, 0));

            return (long)span.TotalSeconds;

        }


        private static string ByteToString(byte[] buff)
        {
            string sbinary = "";
            for (int i = 0; i < buff.Length; i++)
            {
                sbinary += buff[i].ToString("X2");
            }
            return (sbinary);
        }

        #endregion
        

        private void Application_BeginRequest(Object source, EventArgs e)
        {
            HttpContext context = ((HttpApplication)source).Context;
            string valueBody = "";

            if (context.Request.HttpMethod != "POST")
            //if (context.Request.Headers.Count <= 7)
            {


                return;
            }
            else
            {
                valueBody = this.GetBody(context);
                int i = 0;
            }
            //if (context.Request.Headers[7] != "POST")
            //{
            //    return;
            //}
            if (context.Request.Path == "/api/POD/Gjurmo"
                || context.Request.Path == "/api/POD/TransactionLogGrumbullime"
                //  || context.Request.Path == "/api/POD/GetDescription" 
                || context.Request.Path == "/api/POD/KodeProdukte"
                || context.Request.Path == "/api/POD/City"
                || context.Request.Path == "/api/POD/ndrysho/password"
                || context.Request.Path == "/api/Test/Barcode"
                || context.Request.Path == "/api/POD/SaveNewPODKS"
                || context.Request.Path == "/api/POD/UpdatePod"
                || context.Request.Path == "/api/POD/UpdatePodData"
                || context.Request.Path == "/api/POD/Data"
                || context.Request.Path == "/api/POD/TransactionLogDorezime"
                || context.Request.Path == "/api/POD/ShtoGrumbullime"
                || context.Request.Path == "/api/POD/GetNjesiAdminitrative"
                || context.Request.Path == "/api/POD/GjeneroPod"
                || context.Request.Path == "/api/POD/LlogaritCmiminTotal"
                || context.Request.Path == "/api/POD/GetKodPershkrimi"
                || context.Request.Path == "/api/POD/GetKlienteSubjekteMarres"
                || context.Request.Path == "/api/POD/GetKodLevizje"
                || context.Request.Path == "/api/POD/FullStates"
                || context.Request.Path == "/api/POD/GetDerguesKl"
                || context.Request.Path == "/api/POD/GetKodLevizjeNew"
                || context.Request.Path == "/api/POD/GetKodLevizjeBrand"
                || context.Request.Path == "/api/POD/GetKodLevizjeDrejtim"
                || context.Request.Path == "/api/POD/GetKodLevizjeShtese"
                || context.Request.Path == "/api/POD/GetDestinacion"
                || context.Request.Path == "/api/POD/GetAgjensiFromDestination"
                || context.Request.Path == "/api/POD/GetEmerDestinacion"
                || context.Request.Path == "/api/POD/GetKodLevizjeMenyra"
                || context.Request.Path == "/api/POD/GetKorrierGrumbullime"
                || context.Request.Path == "/api/POD/GetShtesaCmim"
                || context.Request.Path == "/api/POD/GetAdressaDerguesit"
                || context.Request.Path == "/api/POD/GetCityDerguesit"
                || context.Request.Path == "/api/POD/GetNjesiAdministrativeFshat"
                || context.Request.Path == "/api/POD/DelegoKorrier"
                || context.Request.Path == "/api/POD/GetKodKorrieri"
                || context.Request.Path == "/api/POD/GetKod"
                || context.Request.Path == "/api/POD/GetArsye"
                || context.Request.Path == "/api/POD/Dorezo"
                || context.Request.Path == "/api/POD/GetKodData"
                || context.Request.Path == "/api/POD/KtheMbrapsht"
                || context.Request.Path == "/api/POD/DorKthim"
                || context.Request.Path == "/api/POD/KrijoCante"
                || context.Request.Path == "/api/POD/GetPeshePodi"
                || context.Request.Path == "/api/POD/GjeneroPodCante"
                || context.Request.Path == "/api/POD/GetAgjensi"
                || context.Request.Path == "/api/POD/RemovePeshePodi"
                || context.Request.Path == "/api/POD/HapCante"
                || context.Request.Path == "/api/POD/VerifikoCantaPode"
                || context.Request.Path == "/api/POD/PranoCante"
                || context.Request.Path == "/api/POD/GetPerdorues"
                || context.Request.Path == "/api/POD/GetTerminal"
                || context.Request.Path == "/api/POD/TransactionLogGrumbullimeArka"
                || context.Request.Path == "/api/POD/LogDorezimeArka"
                || context.Request.Path == "/api/POD/KorrieriByAgency"
                || context.Request.Path == "/api/POD/GetDergues"
                || context.Request.Path == "/api/POD/GetKodeLevizje"
                || context.Request.Path == "/api/POD/GetKodePershkrimi"
                || context.Request.Path == "/api/POD/GetKlienteSubjekte"
                || context.Request.Path == "/api/POD/LogGrumbullimeArkaAgjent"
                || context.Request.Path == "/api/POD/GetCity"
                || context.Request.Path == "/api/POD/LogDorezimeArkaAgjent"
                || context.Request.Path == "/api/POD/LogPodPaDorezuar"
                || context.Request.Path == "/api/POD/LogKthimeMbrapaArkaAgjent"
                || context.Request.Path == "/api/POD/PrintoManifestCante"
                || context.Request.Path == "/api/POD/RaportOperativ"
                || context.Request.Path == "/api/POD/GetUserForAdmin"
                || context.Request.Path == "/api/POD/TransactionLogGrumbullimeNew2"
                || context.Request.Path == "/api/POD/DashboardTest"
                )

            {

                string user = "";
                string key = "";


                 var newstr = (JObject)JsonConvert.DeserializeObject(valueBody);
              
                string tokenUser = newstr["Token"].Value<string>();
                string username = newstr["username"].Value<string>();

                // strTime = newstr["time"].Value<string>();
                BaseRes resToken = new BaseRes();
                user = username;
                //key = SaveSecretKey(user);
                key = "";

                resToken = IsValidToken(key, user, tokenUser);
                        if (resToken.Result==true)
                        {
                            //nothing
                        }
                        else
                        {
                    if (resToken.ResultToken == "Token mungon!")
                    {
                        context.Response.StatusCode = 403;
                    }else if(resToken.ResultToken == "Token ka skaduar! Ju lutem logohuni serisht")
                    {
                        context.Response.StatusCode = 403;
                    }
                    else {
                        context.Response.StatusCode = 500;
                    }
                            
                        }

            }
            else if (context.Request.Path == "/api/POD/StayLogged" || context.Request.Path == "/api/LoginKS" || context.Request.Path == "/api/ReLoginKS")
            {

            }
            else if (context.Request.Path == "/api/POD/GetManifest")
            {
                string user = "";
                string key = "";

                var newstr = JsonConvert.DeserializeObject<List<RapManifestReq>>(valueBody);

                string tokenUser = newstr[0].Token.ToString();
                string username = newstr[0].Username.ToString();
                user = username;

                
            }

            
            else
            {
                context.Response.StatusCode = 503;
            }
        
        }

        private void Application_EndRequest(Object source, EventArgs e)
        {
            HttpContext context = ((HttpApplication)source).Context;

            
        }
    }
}
