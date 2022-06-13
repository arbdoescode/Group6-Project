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

        
        public BaseRes DorezoPod(DorezoPodReq param)
        {
            BaseRes res = new BaseRes();



            //param.StatusPod = "Dorezuar ne Klient";
            //param.StatusFizikPod = "I Rregullt";


            ////  param.AgjensiaBurim = "";

            //param.AgjensiaDest = "";
            ////   param.PerdoruesId;
            //param.Korrieri = CheckKorrierDorezime(param);
            //param.Shoferi = "";
            //param.Targa = "";

            //long? podId = GetPodId(param.PodKodi);

            ////if (!ValidateKorrierPod(podId, param.Korrieri))
            ////{
            ////    res.Result = false;
            ////    res.ResultMessage = "Pod nuk është shpërndarë në korrier! Nuk mund te beni dorezimin e podit :  " + param.PodKodi;
            ////    return res;
            ////}

            ////else
            ////{
            //SqlParameter[] SqlParaArr = PrepParamDorezo(param);

            //ExecuteNonQuery("PROC_SAVE_SEND_NE_KLIENT", SqlParaArr);


            //res.ResultMessage = SqlParaArr[15].Value.ToString();

            //if (res.ResultMessage != "Success")
            //{

            //    res.Result = false;
            //    res.ResultMessage = SqlParaArr[15].Value.ToString() + " : " + SqlParaArr[14].Value.ToString();
            //}
            //else
            //{
            //    if (param.ArsyeMosdorezimi == null && GetDerguesId(param.PodKodi) == 1622)
            //    {
            //        SendNotificationGjejeVete(param.PodKodi);
            //    }
            //    res.Result = true;
            //    res.ResultMessage = SqlParaArr[15].Value.ToString() + " : " + SqlParaArr[14].Value.ToString();
            //}


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

        

        public PodSaveRes SavePOD(PodSaveReq param)
        {
            PodSaveRes ret = new PodSaveRes();

            PodSaveRes ret2 = new PodSaveRes();

            try
            {

                POD p = new POD();

                param.CmimiBaze = param.CmimiBazeTry;
                //ret2 = ProcSaveNewPod(param);



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
                ret = false;
                str = "Ju lutem plotesoni Destinacionin!";
                res.Add(str);

                arr[13] = str;
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
