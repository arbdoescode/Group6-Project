using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AcApi.Models;
using System.ComponentModel;
using System.Globalization;
using System.Data.Entity.Core.Objects;
using System.Security.Cryptography;
using AcApi.Models.Response;
using AcApi.Models.Request;
using System.Data.SqlClient;
using System.Data;

namespace AcApi.Services
{
    public class Pod
    {
        Group6DBEntities dbContext = new Group6DBEntities();

        #region Code

        #region Arb Koci

        
        public List<string> GetAllPodOrders(string klient, string kodProdukti, string pNga, string pDeri, string klientSubjekt, string kodLevizje)
        {

            var query = new List<string>();

            
                DateTime dtNgaMin = new DateTime(DateTime.Now.Date.AddDays(-7).Year, DateTime.Now.Date.AddDays(-7).Month, DateTime.Now.Date.AddDays(-7).Day, 0, 0, 0, 0);
                DateTime dtDeriMax = new DateTime(DateTime.Now.Date.Year, DateTime.Now.Date.Month, DateTime.Now.Date.Day, 23, 59, 59, 999);
               
                query = dbContext.PODs.Where( e => e.DATA >= dtNgaMin && e.DATA <= dtDeriMax
                                                             ).Select(e => e.KODI).ToList();
            


            if (query.Count() == 0)
            {
                return query;
            }

            return query;

        }
        public DashbaordRes2 GetDashboard(string klient, string kodProdukti, string pNga, string pDeri, string klientSubjekt, string kodLevizje)
        {
            DashbaordRes2 res = new DashbaordRes2();



            List<string> pode = GetAllPodOrders(klient, kodProdukti, pNga, pDeri, klientSubjekt, kodLevizje);

            if (pode.Count() == 0)
            {
                return res;
            }
            else if (pode.Count() != 0)
            {
                foreach (var itm in pode)
                {
                    var queryStatus = dbContext.PODs.FirstOrDefault(e => e.KODI == itm).POD_STATUS_ID;

                    if (queryStatus == 1)
                    {
                        res.NrDorezime++;
                    }

                    else if (queryStatus == 6)
                    {

                        res.NrPorosi++;
                    }
                    else if (queryStatus == 4)
                    {
                        res.NrPodHub++;
                    }

                    else if (queryStatus == 3)
                    {
                        res.NrMosDorezime++;
                    }
                    else if (queryStatus == 5)
                    {
                        res.NrDeleguarKorrier++;
                    }

                    res.NrGrumbullime++;


                }
            }





            return res;
        }



        public BindingList<TransactionLogGrumbullime> TransactionLogVetem_Grumbullime_New(CriteriaTransLogGrumbullimParam param)
        {

            BindingList<TransactionLogGrumbullime> retList = new BindingList<TransactionLogGrumbullime>();
            BindingList<TransactionLogGrumbullime> retList2 = new BindingList<TransactionLogGrumbullime>();
            BindingList<TransactionLogGrumbullime> returnList = new BindingList<TransactionLogGrumbullime>();

            try
            {


                DateTime dtNgaMin = new DateTime(DateTime.Now.Date.AddDays(-7).Year, DateTime.Now.Date.AddDays(-7).Month, DateTime.Now.Date.AddDays(-7).Day, 0, 0, 0, 0);
                DateTime dtDeriMax = new DateTime(DateTime.Now.Date.Year, DateTime.Now.Date.Month, DateTime.Now.Date.Day, 23, 59, 59, 999);
                long status = 1;
                if(param.pStatus== "Grumbulluar")
                {
                    status = 4;
                }else if (param.pStatus == "Porosia Krijuar")
                {
                    status = 6;
                }
                else if (param.pStatus == "Dorezuar ne Klient")
                {
                    status = 1;
                }
                else if (param.pStatus == "Nuk u Dorezua ne Klient")
                {
                    status = 3;
                }
                else
                {
                    status = 5;
                }
                        



                var query = (from obj in dbContext.PODs
                             where
                                     (obj.DATA >= dtNgaMin && obj.DATA <= dtDeriMax)
                                     &&
                                     (obj.POD_STATUS_ID==status)


                             select obj);


                foreach (var obj in query)
                {

                    TransactionLogGrumbullime res = new TransactionLogGrumbullime();

                    res.POD = obj.KODI;
                    // res.AgjensiaDestinacion = obj.Agjensia_Destinacion;
                    //  res.AgjensiaRemote = obj.AgjensiaRemote;
                    //  res.Banka = obj.Banka;
                    res.Cmimi_Baze = obj.CMIMI_BAZE.ToString();
                    res.Cmimi_me_zbritje = obj.CMIMI_ZBRITJE;
                    res.Data = obj.DATA;
                    res.Derguesi = obj.DER_EMRI;
                    res.Kod_Levizje = obj.KODI_LEVIZJES;
                    res.Kod_Reference = obj.KODI_REFERENCE;
                    res.Kodi_Produktit = obj.KODI_PRODUKTI_ID.ToString();
                    res.EmriMarresit = obj.MAR_EMRI;
                    res.QytetiMarres = "TIRANE";
                    res.Pesha = obj.PESHA;
                    res.VleraKP = obj.VLERA_SIGURUAR;
                    res.KushPaguan = "Marresi";
                    

                        res.Total = 0;
                    


                    retList.Add(res);


                }


                return retList;
            }



            catch (Exception ex)
            {

                throw ex;


            }
        }



            
            
        public BaseRes DorezoPod(DorezoPodReq param)
        {
            BaseRes res = new BaseRes();

            var ret = dbContext.PODs.Where(e => e.KODI == param.PodKodi).
               Select(e => e.POD_STATUS_ID).ToList();
            if (ret[0] == 1)
            {
                res.ResultMessage = "Error";
            }
            else
            {
                res.ResultMessage = "Success";
                if (param.Veprimi == "Dorezuar")
                {

                    
                    var recordToUpdate = (from p in dbContext.PODs
                                          where (p.KODI == param.PodKodi)
                                          select p).Single();
                    recordToUpdate.POD_STATUS_ID = 1;
                    recordToUpdate.MAR_EMRI = param.Marresi;
                    recordToUpdate.DATA = DateTime.Now;
                    dbContext.SaveChanges();
                }
                
            }

            if (res.ResultMessage != "Success")
            {

                res.Result = false;
                res.ResultMessage = "Ky Pod eshte dorezuar nje here";
            }
            else
            {
                if (param.Veprimi == "Mosdorezim")
                {
                    res.Result = true;
                    res.ResultMessage = "Pod eshte kthyer mbrapsht";
                    var recordToUpdate = (from p in dbContext.PODs
                                          where (p.KODI == param.PodKodi)
                                          select p).Single();
                    recordToUpdate.POD_STATUS_ID = 3;
                    recordToUpdate.DATA = DateTime.Now;
                    dbContext.SaveChanges();
                }
                else
                {
                    res.Result = true;
                    res.ResultMessage = "Pod u dorezua me sukses";
                }
            }


            return res;

            //  }
        }

        public string GetKorrier(string podKodi)
        {
            string rsp = "";

            long? test = GetKorrierIdPod(podKodi);

            var ret = dbContext.KORRIERETs.Where(e => e.ID == test).Select(e => e.KODI).FirstOrDefault().ToString();
            var ret1 = dbContext.KORRIERETs.Where(e => e.ID == test).Select(e => e.EMRI).FirstOrDefault().ToString();
            var ret2 = dbContext.KORRIERETs.Where(e => e.ID == test).Select(e => e.MBIEMRI).FirstOrDefault().ToString();
            if (ret.Count() == 0)
            {
                return "";
            }

            else
            {
                rsp = ret+" : "+ret1+" "+ret2;
            }


            return rsp;
        }

        private long? GetKorrierIdPod(string podkodi)
        {
            long? ret = 0;

            long? stId = 0;

            try
            {

                long? podId = GetPodId(podkodi);

                var query = (from t in dbContext.PODs
                             where
                             t.ID == podId
                             select t.KORRIERI_ID);


                if (query == null)
                {
                    ret = -1;
                }

                stId = query.ToList().Last<long?>();

                ret = stId;

            }

            catch (Exception ex)
            {

            }

            return ret;

        }

        private long? GetPodId(string podKodi)
        {
            long podId = 0;

            var query = dbContext.PODs.FirstOrDefault(e => e.KODI == podKodi).ID;

            if (query == null)
            {
                return 0;
            }

            podId = query;

            return podId;
        }
    
        
        
        public PodSaveRes NdryshoPassword(NdryshoPassReq pReq)
        {
            PodSaveRes res = new PodSaveRes();
            var check = (from p in dbContext.PERDORUES
                        where (p.USERNAME == pReq.username)
                        select p.PASSWORD).FirstOrDefault();

            if (check.ToString() != pReq.Tag)
            {
                res.Result = false;
                res.ResultDescription = "Ka ndodhur nje gabim. Fjalekalimi nuk eshte ndryshuar!";
            }
            else
            {

                var recordToUpdate = (from p in dbContext.PERDORUES
                                      where (p.USERNAME == pReq.username)
                                      select p).Single();
                recordToUpdate.PASSWORD = pReq.Password;
                dbContext.SaveChanges();

                res.Result = true;
                res.ResultDescription = "Fjalëkalimi u modifikua me sukses.";
            }

            return res;
        }

        private string GetPerqindjeTakseKArburanti(string pKodLevizje, string kodprodukti, string pesha)
        {


            string perqindje = "0";

            var query = dbContext.CONFIG_TAKSE_KARBURANTI.
                         Where(
                               e => e.KODI_LEVIZJES == pKodLevizje
                              ).Select(e => e.PERQINDJE).ToList<string>();

            perqindje = query.LastOrDefault<string>();

            if (perqindje == null)
            {
                return "0";
            }

            if (perqindje.Count() == 0)
            {
                return "0";
            }

            if (pKodLevizje == "AL-BOTE" && kodprodukti == "Dokument" && float.Parse(pesha) <= 0.5)
            {
                return "0";
            }

            return perqindje;


        }

        private string GetIDKlientSubjekt(string pKlientSubjektID)
        {


            long nameID = 0;
            string KlientName = "";
            var ret = dbContext.KLIENTE_SUBJEKTE.Where(e => e.EMRI == pKlientSubjektID).Select(e => e.ID);

            if (ret == null)
            {

                return "";
            }

            else
            {


                nameID = ret.FirstOrDefault<long>();
                KlientName = nameID.ToString();
            }

            return KlientName;

        }

        private string GetPerqindjeTvsh()
        {

            var ret = dbContext.TVSHes.Select(e => e.PERQINDJE);


            if (ret == null)
            {
                return "";
            }

            if (ret.Count() == 0)
            {
                return "";
            }


            return ret.FirstOrDefault<string>();
            return "";



        }

        private string GetKodPostarDergues(string pKlientSubjektID)
        {
            long ksID = long.Parse(pKlientSubjektID);
            long qytetID = 0;
            string kodPostar = "";


            var retKliente = dbContext.KLIENTE_SUBJEKTE.Where(e => e.ID == ksID).Select(e => e.QYTETI_ID);

            if (retKliente == null)
            {

                return "";
            }

            else
            {
                qytetID = retKliente.FirstOrDefault<long>();

                var retKodiPostar = dbContext.KODE_POSTAR.Where(e => e.ID == qytetID).Select(e => e.KODI);

                if (retKodiPostar == null)
                {

                    return "";
                }


                kodPostar = retKodiPostar.FirstOrDefault<string>();

            }

            return kodPostar;
        }

        private string GetDiscountKlient(string pKlientSubjektID)
        {
            long ksID = long.Parse(pKlientSubjektID);

            string discount = null;

            var query = dbContext.PERQINDJE_KLIENTE_SUBJEKTE.
                         Where(
                               e => e.KLIENTE_SUBJEKTE_ID == ksID
                              ).Select(e => e.PERQINDJE_DISCOUNT);

            discount = query.FirstOrDefault<string>();

            if (discount == null)
            {
                return null;
            }

            if (discount.Count() == 0)
            {
                return null;
            }

            return discount;

        }

        private string GetKursi()
        {

            string kursi = "";
            var query = dbContext.KURSIs.
                Where
                    (e => e.ID == 5).Select(e => e.KURSI1);

            kursi = query.FirstOrDefault<string>();

            return kursi;
        }

        

        public long GetCitybyId(string qyteti)
        {
            long rsp = 0;

            var ret = dbContext.QYTETEs.Where(
                               e => e.EMRI == qyteti
                              ).Select(e => e.ID); 

            rsp = ret.FirstOrDefault<long>();
            return rsp;
        }

        public long GetStatebyId(string shteti)
        {
            long rsp = 0;

            var ret = dbContext.SHTETEs.Where(
                               e => e.EMRI == shteti
                              ).Select(e => e.ID);

            
            rsp = ret.FirstOrDefault<long>();
            return rsp;
        }

        private PodSaveRes ProcSaveNewPod(PodSaveReq pReq)
        {

            //****************************
            PodSaveRes ret2;
            POD saveorder = new POD();
            //****************************

            string strAgjOrigjine = pReq.AgjensiaOrigjine;

            string strEmriKlientSubjekt = pReq.KlientSubjektID;

            string idKLSubjekte = GetIDKlientSubjekt(pReq.KlientSubjektID);

            string strMbiemriDergues = "";
            string strAdresaDergues = pReq.AdresaDerguesi;
            string strQyetetiDergues = pReq.QytetiDergues;
            string strShtetiDergues = pReq.ShtetiDergues;
            string strTelDergues = pReq.TelDerguesi;
            string strKodiPostarDergues = GetKodPostarDergues(idKLSubjekte);



            //int? iDKs = GetAgjensiaDestinacionKSTest(pReq.QytetiMarres, pReq.KlientSubjektID);
            //   string strKodLevizjeje = GetKodLevizjeOnePod(pReq.IdGrumbullim); //GetKodLevizjeKS(pReq.QytetiMarres);




            string strAgjensiaDestinacion = pReq.Destinacion;
            //GetAgjensiaDestinacion(pReq.QytetiMarres);

            //int? iDKs = GetIDAgjensiaDestinacionOnePod(pReq.QytetiMarres);  //GetAgjensiaDestinacionKSTest(pReq.QytetiMarres, pReq.KlientSubjektID);

            String strQytetiMarres = pReq.QytetiMarres;//GetQytetiDestiancionOnePOd(iDKs);//GetQytetiDestiancionKS2(pReq.IdGrumbullim);
            string strKodLevizjeje = pReq.KodiLevizjes;
            //  string strQytetiMarres = GetQytetiDestiancionKS2(iDKs);
            string strKlientSubjektDergues = null;
            string strKlientSubjektMarres = null;

            string strTvsh;

            if (strKodLevizjeje == "AL-AL" || strKodLevizjeje == "Brenda Qytetit")
            {
                strTvsh = GetPerqindjeTvsh();
                pReq.MonedhaCmimiBaze = "LEKE";

            }
            else { strTvsh = "0"; pReq.MonedhaCmimiBaze = "EURO"; }


            //****************************************************************************************
            string strSherbimeExtraMenyrePagese = null;
            string strShumaSherbimeExtra = "0";
            string strSherbimiExtra = "Jo";
            string strBanka = null;
            string strNumriCek = "";
            string strMonedhaExtra = "";
            if (pReq.KundrejtPageseLekeCheck == true)
            {
                strSherbimeExtraMenyrePagese = "Me Kesh";
                strShumaSherbimeExtra = pReq.ShumaSherbimeExtra;
                strMonedhaExtra = pReq.MonedhaExtra;
                strSherbimiExtra = pReq.KodiProduktit;

            }





            string strSiguruar = "false";
            string strVleraSiguruar = "0";
            string strVleraJashteZone = "0";
            string strDiscountKlient = null;
            if (pReq.hasZbritje == false)
            {
                if (pReq.hasZbritje2 == false)
                {
                    strDiscountKlient = GetDiscountKlient(idKLSubjekte);
                }
                else
                {
                    if (GetDiscountKlient(idKLSubjekte) == null)
                    {
                        strDiscountKlient = "20";
                    }
                    else
                    {
                        float getDiscount = float.Parse(GetDiscountKlient(idKLSubjekte)) + 10;
                        strDiscountKlient = getDiscount.ToString();
                    }
                }
            }
            else
            {
                if (GetDiscountKlient(idKLSubjekte) == null)
                {
                    strDiscountKlient = "10";
                }
                else
                {
                    float getDiscount = float.Parse(GetDiscountKlient(idKLSubjekte)) + 10;
                    strDiscountKlient = getDiscount.ToString();
                }
            }

            string strKursiCmimiBaze = "0";
            string strCmimiBazeEuro = "";
            string strCmimiBaze = "1";
            string strShtesa = "0";

            if (pReq.ShteseLekeCheck == true)
            {
                strShtesa = pReq.ShteseLekeVlera;
            }

            if (pReq.MonedhaCmimiBaze == "LEKE")
            {
                strKursiCmimiBaze = "1";
                strCmimiBaze = pReq.CmimiBaze;

            }
            else if (pReq.MonedhaCmimiBaze == "EURO")
            {
                strKursiCmimiBaze = GetKursi();
                strCmimiBazeEuro = pReq.CmimiBaze;//(txtMerrCmimLekeEuro(ret.ResultMessage)).ToString("0.00");
                strCmimiBaze = (float.Parse(pReq.CmimiBaze) * float.Parse(strKursiCmimiBaze)).ToString();
            }

            string strAgjensiaRemote = null;
            string strTerminal = pReq.Terminal;
            string strTerminalSerialBios = null;
            string strKodiSherbimit;

            string strPerqindjeTakseKarburanti = "0";
            strPerqindjeTakseKarburanti = GetPerqindjeTakseKArburanti(strKodLevizjeje, pReq.KodPershkrimi, pReq.Pesha);

            string QytetNew = "";
            string Fshat = "";

            if (pReq.isFshat == true)
            {
                QytetNew = pReq.QytetFshat;
            }
            else
            {
                Fshat = pReq.QytetFshat;
            }


            string strValueTakseKarburantiLeke = "0";
            string strValueTakseKarburantiEuro = "0";
            string strCmimiZbritje = strCmimiBaze;
            if (strDiscountKlient == null)
            {
                strDiscountKlient = "0";
            }
            if (strDiscountKlient != "0")
            {
                decimal valuezbritje = (decimal.Parse(strCmimiBaze) - (decimal.Parse(strCmimiBaze) * (decimal.Parse(strDiscountKlient) / 100)));
                strCmimiZbritje = Decimal.Round(valuezbritje, 2).ToString();
            }

            decimal decTakseKarburantiValueLeke = (decimal.Parse(strKursiCmimiBaze) * decimal.Parse(strCmimiBaze)) * decimal.Parse(strPerqindjeTakseKarburanti) / 100;
            decTakseKarburantiValueLeke = Decimal.Round(decTakseKarburantiValueLeke, 2);


            strValueTakseKarburantiLeke = decTakseKarburantiValueLeke.ToString();
            strCmimiBaze = (float.Parse(strCmimiBaze) + float.Parse(strValueTakseKarburantiLeke)).ToString();

            if (strCmimiBazeEuro != "")
            {
                //Value ne Euro e Takse Karburanti
                decimal decTakseKarburantiValueEuro = decimal.Parse(strCmimiBazeEuro) * decimal.Parse(strPerqindjeTakseKarburanti) / 100;
                decTakseKarburantiValueEuro = decimal.Round(decTakseKarburantiValueEuro, 2);


                strValueTakseKarburantiEuro = decTakseKarburantiValueEuro.ToString();
                strCmimiBazeEuro = (float.Parse(strCmimiBazeEuro) + float.Parse(strValueTakseKarburantiEuro)).ToString();
            }

            string strTvshAllShtesa = "0";

            string konfirm;

            if (pReq.hasConfirmed == true)
            {
                konfirm = "1";
            }
            else
            {
                konfirm = null;
            }

            string strKodiKorr = pReq.Korrieri;
            strKodiKorr = strKodiKorr.Substring(strKodiKorr.IndexOf("|") + 1).Trim();

            string strDerguesKunderPagese = "";

            if (pReq.MenyrePagese == "Me Kesh" && pReq.KundrejtPageseLekeCheck && pReq.KushPaguan == "False")
            {
                strDerguesKunderPagese = pReq.KlientSubjektID;//GetNameKlientSubjekt(pReq.KlientSubjektID);
            }
            //else
            //{
            //    strDerguesKunderPagese = "";
            //}
            else
            {
                if (pReq.MenyrePagese == "Me Kredi" && pReq.KushPaguan == "True" && (pReq.KodiProduktit == "D2D" || pReq.KodiProduktit == "P2P" || pReq.KodiProduktit == "P2D" || pReq.KodiProduktit == "D2P"))
                {
                    strKlientSubjektDergues = pReq.KlientSubjektID;  //GetNameKlientSubjekt(pReq.KlientSubjektID);
                    // strKlientSubjektMarres = null;
                }
                else if (pReq.MenyrePagese == "Me Kesh" && pReq.KushPaguan == "False" && pReq.KodiProduktit == "D2D")
                {
                    strKlientSubjektDergues = pReq.KlientSubjektID;
                }
                else
                {
                    strKlientSubjektMarres = pReq.KlientSubjektID;
                    //  strKlientSubjektDergues = null;

                }
            }

            //  ****************************************************************************************
            ObjectParameter objParamMsgType = new ObjectParameter("pMessageType", typeof(string));
            ObjectParameter objParamMsg = new ObjectParameter("pMessage", typeof(string));
            ObjectParameter objParamId = new ObjectParameter("podid", typeof(string));
            //objParam.ParameterType = 
            //****************************************************************************************


            //int result = dbContext.PROC_SAVE_NEW_POD_ORDER_ZONE_KONFIRMIM(
            saveorder.KODI = pReq.PODNr; //Pod Nr
            saveorder.AGJENSIA_ORIGJINE_ID = 8;//strAgjOrigjine; //Agjensia Source, agjensia e celur per keta kliente
            saveorder.QYTETI_DESTINACION_ID = GetCitybyId(strQytetiMarres);//Qyeteti Destinacion
            saveorder.KORRIERI_ID = 6;
            saveorder.KODI_PRODUKTI_ID = 2;//Kodi i Produktit
            saveorder.COPE = pReq.Cope;
            saveorder.PESHA = pReq.Pesha;
            saveorder.PESHA_VOLUMETRIKE="0";  //peshaVolumetrike
            saveorder.DATA = DateTime.Now;
            saveorder.PERSHKRIMI = pReq.Komente; // pReq.Pershkrime, //comments addto interface dhe Req
            saveorder.DER_EMRI = pReq.Derguesi; //emri i derguesit Kliente Subjekti , private function
            saveorder.DER_MBIEMRI = strMbiemriDergues;// derguesi eshte KS,
            saveorder.DER_ADRESA = strAdresaDergues; //adresa e derguesit KS , 
            saveorder.DER_QYTETI_ID = GetCitybyId(strQyetetiDergues);//Qyteti Dergues, KS
            saveorder.DER_SHTETI_ID = GetStatebyId(strShtetiDergues);//Shteti Dergues  KS
            saveorder.DER_TEL = strTelDergues; //tel Dergues
            saveorder.DER_KODI_POSTAR_ID = 2; //kodi postal dergues
            saveorder.MAR_EMRI = pReq.Marresi;  //emri marresit
            saveorder.MAR_MBIEMRI = "";   //mbiemri i marresit
            saveorder.MAR_ADRESA = pReq.AdresaMarresi + pReq.QytetiMarres;
            saveorder.MAR_QYTETI_ID = GetCitybyId(strQytetiMarres);
            saveorder.MAR_SHTETI_ID = GetCitybyId(pReq.ShtetiMarres);
            saveorder.MAR_TEL = pReq.TelMarresi;
            saveorder.MAR_KODI_POSTAR_ID = 1;
            saveorder.CMIMI_BAZE = strCmimiBaze;  //cmimi baze
            saveorder.SHTESA = strShtesa;  // shtesat check takse peshe takse karburanti, 0
            saveorder.TVSH = "0"; //tvsh po/jo shtesa e shtuar me lart//// jo
            saveorder.SHUMA_SHERBIME_EXTRA = strShumaSherbimeExtra;  // shuma sherbime extra
            saveorder.MENYRA_PAGESES_ID = 1 ; // kesh apo kredi 
            saveorder.PAGUESI_DERGUES_MARRES = true; // marres ose dergues KS same 
            saveorder.SHERBIME_EXTRA = strSherbimiExtra;//pReq.KodiProduktit,  //   sherbimet extra nese kodi i levizjes eshte P2PK ose D2DP pReq.KodiProduktit
            saveorder.SHERBIME_EXTRA_MENYRE_PAGESE_ID = 1;  // me kesh dropdown
            saveorder.DER_SUBJ_ID = 1; // ne varesi kush paguan i jepet vlere, nese paguan derguesi KlientSubjektDergues=ks
            saveorder.MARR_SUBJ_ID = 1;  // // ne varesi kush paguan i jepet vlere, nese paguan marresi KlientSubjektDergues=ks
            saveorder.DATE_RREGJISTRIMI = DateTime.Now;
            saveorder.PERDORUES_ID = int.Parse(pReq.UsernameID);  //Perdorues ID per tr2019 konfig per Agjensi
            saveorder.NUMRI_CEK = strNumriCek; //numriCheck tek sherbimet extra ""
            saveorder.MONEDHA_EXTRA_ID = 1;
            saveorder.POD_STATUS_ID = 4;
            saveorder.BANKA_ID = 0;
            saveorder.SIGURUAR = true;
            saveorder.VLERA_SIGURUAR = strVleraSiguruar;
            saveorder.KODI_POSTAR_MARRES = pReq.KodiPostarMarres;
            saveorder.VLERA_JASHTE_ZONE = strVleraJashteZone;
            saveorder.KODI_PERSHKRIMIT_ID = 1;
            saveorder.MONEDHA_CMIMI_BAZE_ID = 1;//add to interface 
            saveorder.PERQINDJE_DISCOUNT = strDiscountKlient;   //GetPerqindjeDiscountByKlientSubjekte  add function and proc: LOAD_PERQINDJE_DISCOUNT_BY_KLIENT_SUBJEKTE  tabela PERQINDJE_KLIENTE_SUBJEKTE
            saveorder.KURSI_CMIMI_BAZE = strKursiCmimiBaze;  // kursi cmimiBaze
            saveorder.CMIMI_BAZE_EURO = strCmimiBazeEuro;
            saveorder.KODI_LEVIZJES = strKodLevizjeje;   //function getKodiLevizjes nga qytetet
            saveorder.PERQINDJE_TVSH = strTvsh;    //GetTvshPerqindje GETPERQINDJETVSH
            saveorder.AGJENSIA_DEST_PIKE_PIKE_ID = null;  // agjensi destinacion pike pike 
            saveorder.AGJENSIA_REMOTE_ID = 1;
            saveorder.TERMINAL_PROCESSOR_ID = strTerminal;

            saveorder.TERMINAL_SERIAL_BIOS = strTerminalSerialBios;
            saveorder.AGJENSIA_DESTINACION_ID = 1; //agjensia Destinacion emri function
            saveorder.KODI_SHERBIMIT = pReq.KodiSherbimit; //ac ekspres
            saveorder.PERQINDJE_TAKSE_KARBURANTI = strPerqindjeTakseKarburanti;
            saveorder.TAKSE_KARBURANTI_VALUE_LEK = strValueTakseKarburantiLeke;
            saveorder.TAKSE_KARBURANTI_VALUE_EURO = strValueTakseKarburantiEuro;
            saveorder.KODI_REFERENCE = pReq.KodReference;
            saveorder.TVSH_SHTESA = "0"; //frmain get all tvsh
            saveorder.TVSH_VL_SIGURUAR = strCmimiZbritje;  //discounti
            saveorder.TVSH_CMIMI_BAZE = strDerguesKunderPagese; // merr vlere nese eshte me kesh             
            saveorder.CMIMI_ZBRITJE = Fshat;
            saveorder.DERGUES_KUNDREJT_PAGESE_ID = 1;
            saveorder.BRAND_ID = 1;
            saveorder.DREJTIM_ID = 1;
            saveorder.FSHAT_ID = 1;
            saveorder.QYTET_ID_NEW = 1;
            saveorder.KONFIRMIM = true;
            saveorder.AGJENSI_TRANZIT = 1;





            dbContext.PODs.Add(saveorder);
            dbContext.SaveChanges();






            ret2 = new PodSaveRes();


            ret2.Result = true;
            ret2.ResultMessage = "Pod - i u rregjistrua me sukses!";
            //ret2.ResultMessageTotali = "test";
            //ret2.ResultDescription = objParamMsg.Value.ToString();
            //ret2.PodId =objParamId.Value.ToString();
            //ret2.ResultCode = 1;

            return ret2;

        }

        public PodSaveRes SavePOD(PodSaveReq param)
        {
            PodSaveRes ret = new PodSaveRes();

            PodSaveRes ret2 = new PodSaveRes();

            try
            {

                POD p = new POD();
                
                param.CmimiBaze = param.CmimiBazeTry;
                ret2 = ProcSaveNewPod(param);



            }
            catch (Exception ex)
            {

                ret2.Result = false;
                if (ex.InnerException != null)
                {
                    string strError = null;
                    strError += ex.InnerException.Message;
                }

            }

            return ret2;
        }

        public bool ExistPod(string podNr)
        {

            bool res = false;
            podNr = podNr.ToUpper().Trim();


            var query = (from c in dbContext.PODs
                         where c.KODI == podNr
                         select c
                        ).Any();

            res = query;
            return res;
        }

        public List<string> GetAgjensi()
        {
            List<string> rsp = new List<string>();

            var ret = dbContext.AGJENSITEs.Where(e => e.AKTIVE).
                Select(e => e.EMRI).ToList();

            if (ret.Count() == 0)
            {
                return rsp;
            }

            else
            {
                rsp = ret;
            }


            return rsp;
        }

        public string[] Validate(PodSaveReq pReq)
        {
            string str = "";

            string[] arr = new string[24];
            bool ret = true;

            List<string> res = new List<string>();
            if (pReq.AdresaMarresi == "" || pReq.AdresaMarresi == null)
            {
                ret = false;
                str = "Ju lutem plotesoni adresen e marresit!";
                res.Add(str);
                arr[0] = str;
            }

            if (pReq.Cope == "" || pReq.Cope == null)
            {
                ret = false;
                str = "Ju lutem plotesoni nr e copeve!";
                res.Add(str);
                arr[1] = str;
            }


            if (pReq.PODNr == "" || pReq.PODNr == null)
            {
                ret = false;
                str = "Ju lutem vendoosni peshen e dergese!";
                res.Add(str);
                arr[2] = str;
            }

            if (pReq.KodiProduktit == "" || pReq.KodiProduktit == null)
            {
                ret = false;
                str = "Ju lutem plotesoni kodin e produktit!";
                res.Add(str);
                arr[3] = str;
            }


            if (pReq.KodPershkrimi == "" || pReq.KodPershkrimi == null)
            {
                ret = false;
                str = "Ju lutem plotesoni kodin e pershkrimit!";
                res.Add(str);
                arr[4] = str;
            }

            if (pReq.KushPaguan == "" || pReq.KushPaguan == null)
            {
                ret = false;
                str = "Ju lutem zgjidhni kush paguan!";
                res.Add(str);
                arr[5] = str;
            }

            if (pReq.MenyrePagese == "" || pReq.MenyrePagese == null)
            {
                ret = false;
                str = "Ju lutem zgjidhni menyren e pageses Me Kesh ose Me Kredi!";
                res.Add(str);
                arr[6] = str;
            }

            //if (pReq.PODNr == "" || pReq.PODNr == null)
            //{
            //    ret = false;
            //    str = "Ju lutem vendoosni nr e dergeses!";
            //    res.Add(str);
            //    arr[7] = str;
            //}

            if (pReq.Pesha == "" || pReq.Pesha == null)
            {
                ret = false;
                str = "Ju lutem plotesoni nr e peshes!";
                res.Add(str);

                arr[7] = str;
            }
            if (pReq.QytetiMarres == "" || pReq.QytetiMarres == null)
            {
                if (pReq.KodiLevizjes == "AL-KS" || pReq.KodiLevizjes == "AL-NM" || pReq.KodiLevizjes == "AL-GR" || pReq.KodiLevizjes == "AL-BOTE" || pReq.KodiLevizjes == "")
                {

                }
                else
                {
                    ret = false;
                    str = "Ju lutem plotesoni Qytetin!";
                    res.Add(str);

                    arr[8] = str;
                }

            }
            if (pReq.Marresi == "" || pReq.Marresi == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Emrin e Marresit!";
                res.Add(str);

                arr[9] = str;
            }
            if (pReq.CmimiBazeTry == "" || pReq.CmimiBazeTry == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Cmimin Baze!";
                res.Add(str);

                arr[10] = str;
            }
            if (pReq.ShtetiMarres == "" || pReq.ShtetiMarres == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Shtetin!";
                res.Add(str);

                arr[11] = str;
            }
            if (pReq.Korrieri == "" || pReq.Korrieri == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Korrierin!";
                res.Add(str);

                arr[12] = str;
            }
            if (pReq.Destinacion == "" || pReq.Destinacion == null)
            {
                
            }
            if (pReq.QytetFshat == "" || pReq.QytetFshat == null)
            {
                if (pReq.isNational == true)
                {
                    ret = false;
                    str = "Ju lutem plotesoni Njesin Administrative!";
                    res.Add(str);

                    arr[19] = str;
                }
            }
            if (pReq.Levizja == "" || pReq.Levizja == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Levizjen!";
                res.Add(str);

                arr[14] = str;
            }
            if (pReq.Drejtimi == "" || pReq.Drejtimi == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Drejtimin!";
                res.Add(str);

                arr[15] = str;
            }
            if (pReq.Brandi == "" || pReq.Brandi == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Brandin!";
                res.Add(str);

                arr[16] = str;
            }
            if (pReq.KodiSherbimit == "" || pReq.KodiSherbimit == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Kodin e Sherbimit!";
                res.Add(str);

                arr[17] = str;
            }
            if (pReq.KodiLevizjes == "" || pReq.KodiLevizjes == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Kodin e Levizjes!";
                res.Add(str);

                arr[18] = str;
            }
            if (pReq.Derguesi == "" || pReq.Derguesi == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Derguesin!";
                res.Add(str);

                arr[20] = str;
            }
            if (pReq.AdresaDerguesi == "" || pReq.AdresaDerguesi == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Adresen e Derguesit!";
                res.Add(str);

                arr[21] = str;
            }
            if (pReq.ShtetiDergues == "" || pReq.ShtetiDergues == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Shtetin Dergues!";
                res.Add(str);

                arr[22] = str;
            }
            if (pReq.QytetiDergues == "" || pReq.QytetiDergues == null)
            {
                ret = false;
                str = "Ju lutem plotesoni Qytetin Dergues!";
                res.Add(str);

                arr[23] = str;
            }
            //if (pReq.KodiLevizjes == "" || pReq.KodiLevizjes == null)
            //{
            //    ret = false;
            //    str = "Ju lutem plotesoni Kodin e Levizjes!";
            //    res.Add(str);

            //    arr[24] = str;
            //}
            //if (pReq.KodiLevizjes == "" || pReq.KodiLevizjes == null)
            //{
            //    ret = false;
            //    str = "Ju lutem plotesoni Kodin e Levizjes!";
            //    res.Add(str);

            //    arr[25] = str;
            //}
            if (ret == true)
            {

                return arr = null; ;
            }
            else
            {
                return arr;
            }



        }
        
        public List<string> GetFullStates()
        {
            List<string> rsp = new List<string>();

            var ret = dbContext.SHTETEs.ToList().Select(e => e.EMRI);

            if (ret != null)
            {
                rsp = ret.ToList();
            }
            else
            {
                return rsp;
            }
            return rsp;
        }

        public List<string> GetCity()
        {
            List<string> rsp = new List<string>();

            var ret = dbContext.QYTETEs.ToList().Select(e => e.EMRI);

            if (ret != null)
            {
                rsp = ret.ToList();
            }
            return rsp;
        }

        public List<string> GetKodPershkrimi()
        {
            List<string> rsp = new List<string>();

            //var ret = dbContext.KODI_PERSHKRIMIT.
            //    Select(e => e.EMRI).ToList();

            //if (ret.Count() == 0)
            //{
            //    return rsp;
            //}

            //else
            //{
            //    rsp = ret;
            //}
            rsp.Add("Dokument");
            rsp.Add("Pako");

            return rsp;
        }

        public List<string> GetKodLevizje()
        {
            List<string> rsp = new List<string>();

            //var ret = dbContext.KODE_LEVIZJE_NEW
            //                                  .Select(e => e.EMRI_LEVIZJA).ToList();
            //if (ret != null)
            //{
            //    rsp = ret.ToList();
            //}

            rsp.Add("NDERKOMBETAR");
            rsp.Add("KOMBETAR");
            rsp.Add("RAJONAL");

            return rsp;
        }

        public List<string> GetKodeLevizje()
        {
            List<string> rsp = new List<string>();

            //var ret = dbContext.KODI_LEVIZJES.
            //    Select(e => e.EMRI).ToList();

            //if (ret.Count() == 0)
            //{
            //    return rsp;
            //}

            //else
            //{
            //    rsp = ret;
            //}
            rsp.Add("Brenda Qytetit");
            rsp.Add("AL-AL");
            rsp.Add("AL -BOTE");
            rsp.Add("AL -GR");
            rsp.Add("BOTE -AL");
            rsp.Add("GR -AL");
            rsp.Add("AL -KS");
            rsp.Add("KS -AL");
            rsp.Add("Bote -Al ESWD");
            rsp.Add("AL -NM");
            rsp.Add("NM -AL");


            return rsp;
        }

        public List<string> GetKodLevizjeBrand(string LevizjaKombetare)
        {
            List<string> rsp = new List<string>();



            var ret = dbContext.LEVIZJA_BRAND
                                              .Where(e => e.LEVIZJA == LevizjaKombetare)
                                              .ToList()
                                              .Select(e => e.BRAND);

            if (ret != null)
            {
                rsp = ret.ToList();
            }
            return rsp;
        }
        public List<string> GetKodLevizjeDrejtim(string LevizjaKombetare)
        {
            List<string> rsp = new List<string>();



            var ret = dbContext.LEVIZJA_DREJTIM
                                              .Where(e => e.LEVIZJA == LevizjaKombetare)
                                              .ToList()
                                              .Select(e => e.DREJTIM);

            if (ret != null)
            {
                rsp = ret.ToList();
            }
            return rsp;
        }

        public List<string> GetKodLevizjeShtese(string LevizjaKombetare)
        {
            List<string> rsp = new List<string>();


            //var ret = dbContext.KODI_LEVIZJES
            //                                  .Where(e => e.LEVIZJA == LevizjaKombetare)
            //                                  .ToList()
            //                                  .Select(e => e.EMRI);

            //if (ret != null)
            //{
            //    rsp = ret.ToList();
            //}
            rsp.Add("AL-AL");
            return rsp;
        }

        public List<string> GetKodLevizjeMenyra(string LevizjaKombetare)
        {
            List<string> rsp = new List<string>();

            var ret = dbContext.KODI_SHERBIMIT
                                         .Where(e => e.KODI_LEVIZJES == LevizjaKombetare)
                                         .ToList()
                                         .Select(e => e.EMRI);
            if (ret != null)
            {
                rsp = ret.ToList();
            }
            return rsp;

        }

        public List<string> GetKorrierGrumbullime(string agency)
        {
            List<string> rsp = new List<string>();
            long agencyId = (long)Convert.ToDouble(agency);
            //var ret = dbContext.LEVIZJA_BRAND
            //                                  .Select(e => e.BRAND).ToList();

            var ret = dbContext.KORRIERETs.Select(e => e.EMRI + " " + e.MBIEMRI + " | " + e.KODI);

            if (ret != null)
            {
                rsp = ret.ToList();
            }
            return rsp;
        }

        public List<string> GetShtesaCmim()
        {
            List<string> rsp = new List<string>();

            //var ret = dbContext.LEVIZJA_BRAND
            //                                  .Select(e => e.BRAND).ToList();

            var ret = dbContext.SHTESA_TYPE
                                              .ToList()
                                              .Select(e => e.EMRI);

            if (ret != null)
            {
                rsp = ret.ToList();
            }
            return rsp;
        }
        

        public BaseRes KrijoCante(KrijoCanteReq pReq)
        {
            BaseRes res = new BaseRes();

            ObjectParameter objData = new ObjectParameter("pData", typeof(DateTime));
            ObjectParameter objLastId = new ObjectParameter("pLastId", typeof(string));
            ObjectParameter objParamMsg = new ObjectParameter("pMessage", typeof(string));
            ObjectParameter objParamMsgType = new ObjectParameter("pMessageType", typeof(string));

            ObjectParameter objData1 = new ObjectParameter("pData", typeof(DateTime));
            ObjectParameter objLastId1 = new ObjectParameter("pLastId", typeof(string));
            ObjectParameter objParamMsg1 = new ObjectParameter("pMessage", typeof(string));
            ObjectParameter objParamMsgType1 = new ObjectParameter("pMessageType", typeof(string));

            using (var transaction = dbContext.Database.BeginTransaction())
            {

                try

                {
                    var result = dbContext.PROC_KRIJO_CANTE(
                                                                    pReq.CantaKodi,
                                                                    pReq.AgjensiaDestinacion,
                                                                    pReq.AgjensiaDestinacion,
                                                                    pReq.Pesha,
                                                                    pReq.PerdoruesId,
                                                                    pReq.NrRripSigurimi, //pReq.StatusFizikPod,
                                                                    "JOANULLUAR",
                                                                    "0004",
                                                                     "",
                                                                    objData,
                                                                    objLastId,
                                                                    objParamMsg,
                                                                    objParamMsgType

                                                                    );


                    if (result == 0 || result == null)
                    {
                        res.Result = false;
                        res.ResultMessage = "Ka ndodhur nje gabim. Fjalekalimi nuk eshte ndryshuar!" + objParamMsg.Value.ToString();

                    }
                    else if (objParamMsgType.Value.ToString() == "Error")
                    {
                        res.Result = false;
                        res.ResultMessage = objParamMsg.Value.ToString();

                    }
                    else
                    {
                        res.Result = true;
                        res.ResultMessage = objParamMsg.Value.ToString();
                    }

                    dbContext.SaveChanges();

                    if (res.Result == true)
                    {

                        for (int i = 0; i < pReq.NrPod.Length; i++)
                        {
                            pReq.CantaId = objLastId.Value.ToString();

                            var result2 = dbContext.PROC_KRIJO_CANTE_PODE(
                                                                           pReq.CantaId,
                                                                           "",
                                                                           pReq.NrPod[i],
                                                                           pReq.PerdoruesId,
                                                                           "",
                                                                           "",
                                                                           objData1,
                                                                           objLastId1,
                                                                           objParamMsg1,
                                                                           objParamMsgType1
                                                                            );
                        }

                        if (result == 0 || result == null)
                        {
                            res.Result = false;
                            res.ResultMessage = "Ka ndodhur nje gabim. Fjalekalimi nuk eshte ndryshuar!" + objParamMsg.Value.ToString();

                        }
                        else if (objParamMsgType1.Value.ToString() == "Error")
                        {
                            res.Result = false;
                            res.ResultMessage = objParamMsg1.Value.ToString();


                        }
                        else
                        {
                            res.Result = true;
                            res.ResultMessage = objParamMsg1.Value.ToString();

                            dbContext.SaveChanges();
                            transaction.Commit();
                        }

                    }

                }

                catch (Exception ex)
                {
                    res.Result = false;
                    res.ResultMessage = "Ka ndodhur nje gabim : " + ex.Message;
                    transaction.Rollback();

                }
            }
            return res;
        }

        public string GjeneroPodCante()
        {
            string nrPod = "";


            var recordToUpdate = (from p in dbContext.Gjenero_Cante_Pod

                                  select p).Single();

            if (recordToUpdate == null)
            {
                return "";
            }

            string value = "";

            if (Math.Floor(Math.Log10(int.Parse(recordToUpdate.NumraTrue)) + 1) == 4)
            {
                int intvalue = int.Parse(recordToUpdate.NumraTrue) + 1;
                value = intvalue.ToString();
                recordToUpdate.NumraTrue = value;
            }
            else if (Math.Floor(Math.Log10(int.Parse(recordToUpdate.NumraTrue)) + 1) == 3)
            {
                if (int.Parse(recordToUpdate.NumraTrue + 1) != 1000)
                {
                    int intvalue = int.Parse(recordToUpdate.NumraTrue) + 1;
                    value = "0" + intvalue.ToString();
                    recordToUpdate.NumraTrue = value;
                }
                else
                {
                    value = "1000";
                    recordToUpdate.NumraTrue = value;
                }
            }
            else if (Math.Floor(Math.Log10(int.Parse(recordToUpdate.NumraTrue)) + 1) == 2)
            {
                if (int.Parse(recordToUpdate.NumraTrue + 1) != 100)
                {
                    int intvalue = int.Parse(recordToUpdate.NumraTrue) + 1;
                    value = "00" + intvalue.ToString();
                    recordToUpdate.NumraTrue = value;
                }
                else
                {
                    value = "0100";
                    recordToUpdate.NumraTrue = value;
                }
            }
            else
            {
                if (int.Parse(recordToUpdate.NumraTrue + 1) != 10)
                {
                    int intvalue = int.Parse(recordToUpdate.NumraTrue) + 1;
                    value = "000" + intvalue.ToString();
                    recordToUpdate.NumraTrue = value;
                }
                else
                {
                    value = "0010";
                    recordToUpdate.NumraTrue = value;
                }
            }

            dbContext.SaveChanges();

            nrPod = recordToUpdate.Shkronja + value;
            return nrPod;
        }

        public List<PodUpdateReq> GetPod(string nrPod)
        {

            PodUpdateReq podData = new PodUpdateReq();

            List<PodUpdateReq> listPod = new List<PodUpdateReq>();

            var ret = dbContext.PODs.Where(e => e.KODI == nrPod).Select(e => e).ToList();
            if (ret.Count() == 0)
            {
                var ret1 = dbContext.POD_ORDERS.Where(e => e.KODI == nrPod).Select(e => e).ToList();

                foreach (var obj in ret1)
                {
                    // podData.CmimiBaze = obj.CMIMI_ZBRITJE;
                    podData.Cope = obj.COPE;
                    podData.AdresaMarresi = obj.MAR_ADRESA;
                    podData.KlientSubjektDergues = obj.DER_EMRI;
                    podData.KlientSubjektID = obj.DER_SUBJ_ID.ToString();
                    podData.KodiPostarMarres = obj.MAR_KODI_POSTAR_ID.ToString();
                    podData.KodiProduktit = obj.KODI_PRODUKTI_ID.ToString();
                    podData.KodPershkrimi = obj.KODI_PERSHKRIMIT_ID.ToString();
                    podData.KushPaguan = obj.PAGUESI_DERGUES_MARRES.ToString();
                    podData.Marresi = obj.MAR_EMRI;
                    podData.MenyrePagese = obj.MENYRA_PAGESES_ID.ToString();
                    podData.MonedhaCmimiBaze = obj.MONEDHA_CMIMI_BAZE_ID.ToString();
                    podData.MonedhaExtra = obj.MONEDHA_EXTRA_ID.ToString();
                    podData.Komente = obj.PERSHKRIMI;
                    podData.Pesha = obj.PESHA;
                    podData.PODNr = obj.KODI;
                    podData.QytetiMarres = obj.MAR_QYTETI_ID.ToString();
                    podData.ShtetiMarres = obj.MAR_SHTETI_ID.ToString();
                    podData.ShumaSherbimeExtra = obj.SHUMA_SHERBIME_EXTRA;
                    podData.TelMarresi = obj.MAR_TEL;
                    podData.Pershkimi = obj.PERSHKRIMI;



                    if (podData.KushPaguan == "True")
                    {
                        podData.CmimiBaze = "0";
                        double totali = double.Parse(obj.SHUMA_SHERBIME_EXTRA);
                        podData.Total = totali.ToString("0.00");
                    }
                    else
                    {
                        if (podData.MonedhaCmimiBaze == "2")
                        {
                            podData.CmimiBaze = obj.CMIMI_ZBRITJE;

                            double totali = double.Parse(obj.CMIMI_ZBRITJE) + double.Parse(obj.SHUMA_SHERBIME_EXTRA);
                            podData.Total = totali.ToString("0.00");
                        }

                        else
                        {
                            //  podData.CmimiBaze = obj.CMIMI_ZBRITJE;

                            double result = (double.Parse(obj.CMIMI_ZBRITJE) * 1.2);

                            double totali = result + double.Parse(obj.SHUMA_SHERBIME_EXTRA);

                            podData.CmimiBaze = result.ToString("0.00");
                            podData.Total = totali.ToString("0.00");
                        }
                    }

                    listPod.Add(podData);


                }

            }
            else
            {
                foreach (var obj in ret)
                {
                    // podData.CmimiBaze = obj.CMIMI_ZBRITJE;
                    podData.Cope = obj.COPE;
                    podData.AdresaMarresi = obj.MAR_ADRESA;
                    podData.KlientSubjektDergues = obj.DER_EMRI;
                    podData.KlientSubjektID = obj.DER_SUBJ_ID.ToString();
                    podData.KodiPostarMarres = obj.MAR_KODI_POSTAR_ID.ToString();
                    podData.KodiProduktit = obj.KODI_PRODUKTI_ID.ToString();
                    podData.KodPershkrimi = obj.KODI_PERSHKRIMIT_ID.ToString();
                    podData.KushPaguan = obj.PAGUESI_DERGUES_MARRES.ToString();
                    podData.Marresi = obj.MAR_EMRI;
                    podData.MenyrePagese = obj.MENYRA_PAGESES_ID.ToString();
                    podData.MonedhaCmimiBaze = obj.MONEDHA_CMIMI_BAZE_ID.ToString();
                    podData.MonedhaExtra = obj.MONEDHA_EXTRA_ID.ToString();
                    podData.Komente = obj.PERSHKRIMI;
                    podData.Pesha = obj.PESHA;
                    podData.PODNr = obj.KODI;
                    podData.QytetiMarres = obj.MAR_QYTETI_ID.ToString();
                    podData.ShtetiMarres = obj.MAR_SHTETI_ID.ToString();
                    podData.ShumaSherbimeExtra = obj.SHUMA_SHERBIME_EXTRA;
                    podData.TelMarresi = obj.MAR_TEL;
                    podData.Pershkimi = obj.PERSHKRIMI;
                    if (podData.KushPaguan == "True")
                    {
                        podData.CmimiBaze = "0";

                        double totali = double.Parse(obj.SHUMA_SHERBIME_EXTRA);
                        podData.Total = totali.ToString("0.00");

                    }
                    else
                    {
                        if (podData.MonedhaCmimiBaze == "2")
                        {
                            podData.CmimiBaze = obj.CMIMI_ZBRITJE;

                            double totali = double.Parse(obj.CMIMI_ZBRITJE) + double.Parse(obj.SHUMA_SHERBIME_EXTRA);
                            podData.Total = totali.ToString("0.00");
                        }

                        else
                        {
                            //  podData.CmimiBaze = obj.CMIMI_ZBRITJE;

                            double result = (double.Parse(obj.CMIMI_ZBRITJE) * 1.2);

                            double totali = result + double.Parse(obj.SHUMA_SHERBIME_EXTRA);

                            podData.CmimiBaze = result.ToString("0.00");
                            podData.Total = totali.ToString("0.00");
                        }
                    }

                    listPod.Add(podData);
                }
            }
            return listPod;
        }
        
         public BindingList<UserInfoRes> GetUserForAdmin(string user)
        {
            BindingList<UserInfoRes> result = new BindingList<UserInfoRes>();

            var ret = dbContext.PERDORUES.ToList();
            for(int i = 0; i < ret.Count; i++)
            {
                UserInfoRes res = new UserInfoRes();
                if (user == "" || user == null)
                {
                    
                    string role = "";
                    if (ret[i].RoleID == 1)
                    {
                        role = "Agjent";
                    }
                    else if (ret[i].RoleID == 2)
                    {
                        role = "Korrier";
                    }
                    else if (ret[i].RoleID == 3)
                    {
                        role = "ADMIN";
                    }
                    res.Username = ret[i].USERNAME;
                    res.Password = ret[i].PASSWORD;
                    res.Aktive = ret[i].AKTIVE;
                    res.ClientSubjectID = ret[i].KlienteSubjekteId;
                    res.Role = role;
                    result.Add(res);
                }
                else
                {
                    string check = ret[i].USERNAME;
                    if (check.Contains(user))
                    {
                        string role = "";
                        if (ret[i].RoleID == 1)
                        {
                            role = "Agjent";
                        }
                        else if (ret[i].RoleID == 2)
                        {
                            role = "Korrier";
                        }
                        else if (ret[i].RoleID == 3)
                        {
                            role = "ADMIN";
                        }
                        res.Username = ret[i].USERNAME;
                        res.Password = ret[i].PASSWORD;
                        res.Aktive = ret[i].AKTIVE;
                        res.ClientSubjectID = ret[i].KlienteSubjekteId;
                        res.Role = role;
                        result.Add(res);
                    }
                    else
                    {
                        continue;
                    }
                }
            }
            
            return result;
        }

        
        public List<string> LlogaritCmiminTotal(PodSaveReq pReq)
        {
            List<string> rsp = new List<string>();
            double cbaze = double.Parse(pReq.CmimiBazeTry);
            double zbritje = 0;
            double kursi = 1;
            if (pReq.hasZbritje == false)
            {
                if (pReq.hasZbritje2 == false)
                {
                    zbritje = 0;
                }
                else
                {
                    zbritje = 20;
                }
            }
            else
            {
                zbritje = 10;
            }
            
            cbaze = cbaze - ((cbaze * zbritje) / 100);
            
            double tvsh = (cbaze * 1.2);
            if (pReq.Levizja != "KOMBETAR")
            {
                var query = dbContext.KURSIs.FirstOrDefault(e => e.ID == 1).KURSI1;
                cbaze = cbaze * double.Parse(query);
                tvsh = tvsh * double.Parse(query);
                rsp.Add(pReq.CmimiBazeTry);
                rsp.Add(cbaze.ToString());
                rsp.Add("0");
                rsp.Add(tvsh.ToString());
                rsp.Add(query.ToString());

            }
            else
            {
                rsp.Add(pReq.CmimiBazeTry);
                rsp.Add(cbaze.ToString());
                rsp.Add("0");
                rsp.Add(tvsh.ToString());
                rsp.Add("1");
            }

            return rsp;

        }



        
            
        #endregion

        #region Romeisa Aliu

        public List<string> GetArsye()
        {
            List<string> rtn = new List<string>();

            var query = (from obj in dbContext.ARSYE_MOSDOREZIMI

                         select obj.EMRI).ToList();

            rtn = query;

            return rtn;
        }

       public BaseRes HapCante(HapVerifikoCanteReq pReq)
        {
            BaseRes res = new BaseRes();

            try

            {
                var ret = dbContext.CANTATs.Where(e => e.KODI == pReq.CantaKodi).
               Select(e => e.CANTA_STATUS_ID).ToList();

                if (ret.Count==0)
                {
                    res.Result = false;
                    res.ResultMessage = "Canta nuk existon";

                }
                else
                {
                    if (ret[0] != 1)
                    {
                        res.Result = false;
                        res.ResultMessage = "Canta eshte hapur nje here";
                    }
                    else
                    {
                        var recordToUpdate = (from p in dbContext.CANTATs
                                             where (p.KODI == pReq.CantaKodi)
                                             select p).Single();
                        recordToUpdate.CANTA_STATUS_ID = 2;
                        dbContext.SaveChanges();
                        res.Result = true;
                        res.ResultMessage = "Canta u hap me sukses";
                    }
                } 
                

            }



            catch (Exception ex)
            {
                res.Result = false;
                res.ResultMessage = "Ka ndodhur nje gabim : " + ex.Message;


            }

            return res;
        }

        public BaseRes VerifikoCante(string nrPod, string cantaKode)
        {
            BaseRes res = new BaseRes();
            var ret = dbContext.PODs.Where(e => e.KODI == nrPod).
               Select(e => e.ID).ToList();
            long? idPodi = ret[0];
            var ret2 = dbContext.CANTA_PODE.Where(e => e.POD_ITEM_ID == idPodi).Select(e => e.CANTA_ID).ToList();
            long idCante = ret2[0];
            var retCanta = dbContext.CANTATs.Where(e => e.ID == idCante).Select(e => e.KODI).ToList();

            if (ret2.Count == 0)
            {
                res.Result = false;
                res.ResultMessage = "Podi nuk existon ne cante";
            }
            else
            {
                if (retCanta[0] == cantaKode)
                {
                    var recordToUpdate = (from p in dbContext.PODs
                                          where (p.KODI == nrPod)
                                          select p).Single();
                    recordToUpdate.POD_STATUS_ID = 4;
                    dbContext.SaveChanges();
                    res.Result = true;
                    res.ResultMessage = "Podi u verifikua";
                }
                else
                {
                    res.Result = false;
                    res.ResultMessage = "Podi nuk eshte i kesaj cante";
                }
            }

            return res;
        }

        public bool CheckIsCantaHapur(HapVerifikoCanteReq param)
        {
            bool res = false;

            var ret = dbContext.CANTATs.Where(e => e.KODI == param.CantaKodi).
               Select(e => e.CANTA_STATUS_ID).ToList();

            if (ret.Count != 0)
            {
                if (ret[0] == 2)
                {
                    res = true;
                }
                else
                {
                    res = false;
                }
            }
            else
            {
                res = false;
            }

            return res;
        }


        #endregion


        #endregion


    }

}
