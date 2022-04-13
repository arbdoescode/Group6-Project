using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using AcApi.Models;
using AcApi.Middleware;
using AcApi.Models.Response;

namespace AcApi.Controllers
{

    public class LoginController : ApiController
    {
        Group6DBEntities kl = new Group6DBEntities();
        
         

        UserKeyValidatorsModule userKey = new UserKeyValidatorsModule();

        private bool GetUSer(string pUsername, string pPassword)
        {
            try
            {
                var query = from obj in kl.PERDORUES
                            where
                                (
                                    obj.USERNAME == pUsername
                                &&
                                    obj.PASSWORD == pPassword

                                    &&
                                    obj.AKTIVE == true
                                )
                            select obj;
                if (query == null)
                {
                    return false;
                }

                if (query.Count() == 0)
                {
                    return false;
                }

                return true;

            }
            catch(Exception e)
            {
                return false;
            }


           

        }

        private long GetUserId(string pUsername)
        {
           var ret= kl.PERDORUES.Where(e => e.USERNAME == pUsername).Select(e => e.ID);

            if (ret == null)
            {
                return 0;
            }

            if (ret.Count() == 0)
            {
                return -1;
            }

            return ret.FirstOrDefault<long>();
   

        }

        private long GetTerminalId(long perdorueID)
        {
            var ret = kl.TERMINAL_PERDORUES.Where(e => e.PERDORUES_ID == perdorueID).Select(e => e.TERMINAL_ID);

            if (ret == null)
            {
                return 0;
            }

            if (ret.Count() == 0)
            {
                return -1;
            }

            return ret.FirstOrDefault<long>();


        }

        private string GetIdProcesori(long terminalId)
        {
            var ret = kl.TERMINALEs.Where(e => e.ID == terminalId).Select(e => e.ID_PROCESORI);

            if (ret == null)
            {
                return "";
            }

            if (ret.Count() == 0)
            {
                return "";
            }

            return ret.FirstOrDefault<string>();


        }


        private long? GetAgencyId(long terminalID)
        {
            var ret = kl.TERMINALEs.Where(e => e.ID == terminalID).Select(e => e.AGJENSIA_ID);

            if (ret == null)
            {
                return 0;
            }

            if (ret.Count() == 0)
            {
                return -1;
            }

            return ret.FirstOrDefault<long?>();


        }

        private string GetAgencyName(long? agencyId)
        {
            var ret = kl.AGJENSITEs.Where(e => e.ID == agencyId).Select(e => e.EMRI);

            if (ret == null)
            {
                return "";
            }

            if (ret.Count() == 0)
            {
                return "";
            }

            return ret.FirstOrDefault<string>();


        }


        [HttpPost]
        [Route("api/LoginKS")]

        public LoginKlientRes LoginKS([FromBody]LoginKlient obj)
        {
            LoginKlientRes ret = new LoginKlientRes();

            if (GetUSer(obj.Username, obj.Password))
            {
                ret.Username = obj.Username;
                ret.UsernameID = GetUserId(ret.Username);
                ret.TerminalId = GetTerminalId(ret.UsernameID);
                ret.IdProcesori = GetIdProcesori(ret.TerminalId);
                long? agencyId= GetAgencyId(ret.TerminalId);
                ret.AgencyId = GetAgencyName(agencyId);
                ret.Agjensi = agencyId.ToString();
                ret.Result = true;
                ret.ResultMessage = userKey.GetKeyToday(obj.Username);

                if (ret.ResultMessage == null || ret.ResultMessage.Count() == 0)
                {
                    ret.ResultMessage= userKey.SaveSecretKey(obj.Username);

                }
            }
            else
            {
                ret.Result = false;
                ret.ResultMessage = "Perdorues ose fjalekalim i gabuar";
                ret.Username = "Error";
            }

            return ret;
        }

        [HttpPost]
        [Route("api/ReLoginKS")]

        public LoginKlientRes ReLoginKS([FromBody] LoginKlient obj)
        {
            LoginKlientRes ret = new LoginKlientRes();
            //  LoginKlientRes ret2 = new LoginKliRes();
            ret.Username = obj.Username;
            ret.UsernameID = GetUserId(ret.Username);
            ret.TerminalId = GetTerminalId(ret.UsernameID);
            ret.IdProcesori = GetIdProcesori(ret.TerminalId);
            long? agencyId = GetAgencyId(ret.TerminalId);
            ret.AgencyId = GetAgencyName(agencyId);
            ret.Agjensi = agencyId.ToString();
            ret.Result = true;
            ret.ResultMessage = userKey.GetKeyToday(obj.Username);

            string strClientId = ret.ClientSubjectID.ToString();


            if (ret.ResultMessage == null || ret.ResultMessage.Count() == 0)
            {
                ret.ResultMessage = userKey.SaveSecretKey(obj.Username);

            }



            return ret;
        }



    }
}
