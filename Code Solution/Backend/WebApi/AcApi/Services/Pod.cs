﻿using System;
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

        #region Reference

        //private PodSaveRes ProcSaveNewPod(PodSaveReq pReq)
        //{

        //    //****************************
        //    PodSaveRes ret2;

        //    //****************************

        //    string strAgjOrigjine = pReq.AgjensiaOrigjine;

        //    string strEmriKlientSubjekt = pReq.KlientSubjektID;

        //    string idKLSubjekte = GetIDKlientSubjekt(pReq.KlientSubjektID);

        //    string strMbiemriDergues = "";
        //    string strAdresaDergues = pReq.AdresaDerguesi;
        //    string strQyetetiDergues = pReq.QytetiDergues;
        //    string strShtetiDergues = pReq.ShtetiDergues;
        //    string strTelDergues = pReq.TelDerguesi;
        //    string strKodiPostarDergues = GetKodPostarDergues(idKLSubjekte);



        //    //int? iDKs = GetAgjensiaDestinacionKSTest(pReq.QytetiMarres, pReq.KlientSubjektID);
        //    //   string strKodLevizjeje = GetKodLevizjeOnePod(pReq.IdGrumbullim); //GetKodLevizjeKS(pReq.QytetiMarres);




        //    string strAgjensiaDestinacion = pReq.Destinacion;
        //    //GetAgjensiaDestinacion(pReq.QytetiMarres);

        //    //int? iDKs = GetIDAgjensiaDestinacionOnePod(pReq.QytetiMarres);  //GetAgjensiaDestinacionKSTest(pReq.QytetiMarres, pReq.KlientSubjektID);

        //    String strQytetiMarres = pReq.QytetiMarres;//GetQytetiDestiancionOnePOd(iDKs);//GetQytetiDestiancionKS2(pReq.IdGrumbullim);
        //    string strKodLevizjeje = pReq.KodiLevizjes;
        //    //  string strQytetiMarres = GetQytetiDestiancionKS2(iDKs);
        //    string strKlientSubjektDergues = null;
        //    string strKlientSubjektMarres = null;

        //    string strTvsh;

        //    if (strKodLevizjeje == "AL-AL" || strKodLevizjeje == "Brenda Qytetit")
        //    {
        //        strTvsh = GetPerqindjeTvsh();
        //        pReq.MonedhaCmimiBaze = "LEKE";

        //    }
        //    else { strTvsh = "0"; pReq.MonedhaCmimiBaze = "EURO"; }


        //    //****************************************************************************************
        //    string strSherbimeExtraMenyrePagese = null;
        //    string strShumaSherbimeExtra = "0";
        //    string strSherbimiExtra = "Jo";
        //    string strBanka = null;
        //    string strNumriCek = "";
        //    string strMonedhaExtra = "";
        //    if (pReq.KundrejtPageseLekeCheck == true)
        //    {
        //        strSherbimeExtraMenyrePagese = "Me Kesh";
        //        strShumaSherbimeExtra = pReq.ShumaSherbimeExtra;
        //        strMonedhaExtra = pReq.MonedhaExtra;
        //        strSherbimiExtra = pReq.KodiProduktit;

        //    }





        //    string strSiguruar = "false";
        //    string strVleraSiguruar = "0";
        //    string strVleraJashteZone = "0";
        //    string strDiscountKlient = null;
        //    if (pReq.hasZbritje == false)
        //    {
        //        if (pReq.hasZbritje2 == false)
        //        {
        //            strDiscountKlient = GetDiscountKlient(idKLSubjekte);
        //        }
        //        else
        //        {
        //            if (GetDiscountKlient(idKLSubjekte) == null)
        //            {
        //                strDiscountKlient = "20";
        //            }
        //            else
        //            {
        //                float getDiscount = float.Parse(GetDiscountKlient(idKLSubjekte)) + 10;
        //                strDiscountKlient = getDiscount.ToString();
        //            }
        //        }
        //    }
        //    else
        //    {
        //        if (GetDiscountKlient(idKLSubjekte) == null)
        //        {
        //            strDiscountKlient = "10";
        //        }
        //        else
        //        {
        //            float getDiscount = float.Parse(GetDiscountKlient(idKLSubjekte)) + 10;
        //            strDiscountKlient = getDiscount.ToString();
        //        }
        //    }

        //    string strKursiCmimiBaze = "0";
        //    string strCmimiBazeEuro = "";
        //    string strCmimiBaze = "1";
        //    string strShtesa = "0";

        //    if (pReq.ShteseLekeCheck == true)
        //    {
        //        strShtesa = pReq.ShteseLekeVlera;
        //    }

        //    if (pReq.MonedhaCmimiBaze == "LEKE")
        //    {
        //        strKursiCmimiBaze = "1";
        //        strCmimiBaze = pReq.CmimiBaze;

        //    }
        //    else if (pReq.MonedhaCmimiBaze == "EURO")
        //    {
        //        strKursiCmimiBaze = GetKursi();
        //        strCmimiBazeEuro = pReq.CmimiBaze;//(txtMerrCmimLekeEuro(ret.ResultMessage)).ToString("0.00");
        //        strCmimiBaze = (float.Parse(pReq.CmimiBaze) * float.Parse(strKursiCmimiBaze)).ToString();
        //    }

        //    string strAgjensiaRemote = null;
        //    string strTerminal = pReq.Terminal;
        //    string strTerminalSerialBios = null;
        //    string strKodiSherbimit;

        //    string strPerqindjeTakseKarburanti = "0";
        //    strPerqindjeTakseKarburanti = GetPerqindjeTakseKArburanti(strKodLevizjeje);

        //    string QytetNew = "";
        //    string Fshat = "";

        //    if (pReq.isFshat == true)
        //    {
        //        QytetNew = pReq.QytetFshat;
        //    }
        //    else
        //    {
        //        Fshat = pReq.QytetFshat;
        //    }


        //    string strValueTakseKarburantiLeke = "0";
        //    string strValueTakseKarburantiEuro = "0";
        //    string strCmimiZbritje = strCmimiBaze;
        //    if (strDiscountKlient == null)
        //    {
        //        strDiscountKlient = "0";
        //    }
        //    if (strDiscountKlient != "0")
        //    {
        //        decimal valuezbritje = (decimal.Parse(strCmimiBaze) - (decimal.Parse(strCmimiBaze) * (decimal.Parse(strDiscountKlient) / 100)));
        //        strCmimiZbritje = Decimal.Round(valuezbritje, 2).ToString();
        //    }

        //    decimal decTakseKarburantiValueLeke = (decimal.Parse(strKursiCmimiBaze) * decimal.Parse(strCmimiBaze)) * decimal.Parse(strPerqindjeTakseKarburanti) / 100;
        //    decTakseKarburantiValueLeke = Decimal.Round(decTakseKarburantiValueLeke, 2);


        //    strValueTakseKarburantiLeke = decTakseKarburantiValueLeke.ToString();
        //    strCmimiBaze = (float.Parse(strCmimiBaze) + float.Parse(strValueTakseKarburantiLeke)).ToString();

        //    if (strCmimiBazeEuro != "")
        //    {
        //        //Value ne Euro e Takse Karburanti
        //        decimal decTakseKarburantiValueEuro = decimal.Parse(strCmimiBazeEuro) * decimal.Parse(strPerqindjeTakseKarburanti) / 100;
        //        decTakseKarburantiValueEuro = decimal.Round(decTakseKarburantiValueEuro, 2);


        //        strValueTakseKarburantiEuro = decTakseKarburantiValueEuro.ToString();
        //        strCmimiBazeEuro = (float.Parse(strCmimiBazeEuro) + float.Parse(strValueTakseKarburantiEuro)).ToString();
        //    }

        //    string strTvshAllShtesa = "0";

        //    string konfirm;

        //    if (pReq.hasConfirmed == true)
        //    {
        //        konfirm = "1";
        //    }
        //    else
        //    {
        //        konfirm = null;
        //    }

        //    string strKodiKorr = pReq.Korrieri;
        //    strKodiKorr = strKodiKorr.Substring(strKodiKorr.IndexOf("|") + 1).Trim();

        //    string strDerguesKunderPagese = "";

        //    if (pReq.MenyrePagese == "Me Kesh" && pReq.KundrejtPageseLekeCheck && pReq.KushPaguan == "False")
        //    {
        //        strDerguesKunderPagese = pReq.KlientSubjektID;//GetNameKlientSubjekt(pReq.KlientSubjektID);
        //    }
        //    //else
        //    //{
        //    //    strDerguesKunderPagese = "";
        //    //}
        //    else
        //    {
        //        if (pReq.MenyrePagese == "Me Kredi" && pReq.KushPaguan == "True" && (pReq.KodiProduktit == "D2D" || pReq.KodiProduktit == "P2P" || pReq.KodiProduktit == "P2D" || pReq.KodiProduktit == "D2P"))
        //        {
        //            strKlientSubjektDergues = pReq.KlientSubjektID;  //GetNameKlientSubjekt(pReq.KlientSubjektID);
        //            // strKlientSubjektMarres = null;
        //        }
        //        else if (pReq.MenyrePagese == "Me Kesh" && pReq.KushPaguan == "False" && pReq.KodiProduktit == "D2D")
        //        {
        //            strKlientSubjektDergues = pReq.KlientSubjektID;
        //        }
        //        else
        //        {
        //            strKlientSubjektMarres = pReq.KlientSubjektID;
        //            //  strKlientSubjektDergues = null;

        //        }
        //    }

        //    //  ****************************************************************************************
        //    ObjectParameter objParamMsgType = new ObjectParameter("pMessageType", typeof(string));
        //    ObjectParameter objParamMsg = new ObjectParameter("pMessage", typeof(string));
        //    ObjectParameter objParamId = new ObjectParameter("podid", typeof(string));
        //    //objParam.ParameterType = 
        //    //****************************************************************************************


        //    int result = dbContext.PROC_SAVE_NEW_POD_ORDER_ZONE_KONFIRMIM(
        //                                    pReq.PODNr, //Pod Nr
        //                                   strAgjOrigjine, //Agjensia Source, agjensia e celur per keta kliente
        //                                   strQytetiMarres,//Qyeteti Destinacion
        //                                   strKodiKorr,
        //                                   pReq.KodiProduktit,//Kodi i Produktit
        //                                   pReq.Cope,
        //                                   pReq.Pesha,
        //                                   "0",   //peshaVolumetrike
        //                                   DateTime.Now.ToString("dd/MM/yyyy"),
        //                                   pReq.Komente, // pReq.Pershkrime, //comments addto interface dhe Req
        //                                   pReq.Derguesi, //emri i derguesit Kliente Subjekti , private function
        //                                   strMbiemriDergues,// derguesi eshte KS,
        //                                   strAdresaDergues, //adresa e derguesit KS , 
        //                                   strQyetetiDergues,//Qyteti Dergues, KS
        //                                   strShtetiDergues,//Shteti Dergues  KS
        //                                   strTelDergues, //tel Dergues
        //                                   strKodiPostarDergues, //kodi postal dergues
        //                                   pReq.Marresi,  //emri marresit
        //                                   "",   //mbiemri i marresit
        //                                   pReq.AdresaMarresi + pReq.QytetiMarres,
        //                                   strQytetiMarres,
        //                                   pReq.ShtetiMarres,
        //                                   pReq.TelMarresi,
        //                                   pReq.KodiPostarMarres,
        //                                   strCmimiBaze,  //cmimi baze
        //                                   strShtesa,  // shtesat check takse peshe takse karburanti, 0
        //                                   "0",  //tvsh po/jo shtesa e shtuar me lart//// jo
        //                                   strShumaSherbimeExtra,  // shuma sherbime extra
        //                                   pReq.MenyrePagese, // kesh apo kredi 
        //                                   pReq.KushPaguan, // marres ose dergues KS same 
        //                                   strSherbimiExtra,//pReq.KodiProduktit,  //   sherbimet extra nese kodi i levizjes eshte P2PK ose D2DP pReq.KodiProduktit
        //                                   strSherbimeExtraMenyrePagese,  // me kesh dropdown
        //                                   strKlientSubjektDergues, // ne varesi kush paguan i jepet vlere, nese paguan derguesi KlientSubjektDergues=ks
        //                                   strKlientSubjektMarres,  // // ne varesi kush paguan i jepet vlere, nese paguan marresi KlientSubjektDergues=ks
        //                                   DateTime.Now.ToString("dd/MM/yyyy"),
        //                                   int.Parse(pReq.UsernameID),  //Perdorues ID per tr2019 konfig per Agjensi
        //                                   strNumriCek, //numriCheck tek sherbimet extra ""
        //                                   strMonedhaExtra,
        //                                   "Jo Anulluar",
        //                                   strBanka,
        //                                   strSiguruar,
        //                                   strVleraSiguruar,
        //                                   pReq.KodiPostarMarres,
        //                                   strVleraJashteZone,
        //                                   pReq.KodPershkrimi,
        //                                   pReq.MonedhaCmimiBaze,//add to interface 
        //                                   strDiscountKlient,   //GetPerqindjeDiscountByKlientSubjekte  add function and proc: LOAD_PERQINDJE_DISCOUNT_BY_KLIENT_SUBJEKTE  tabela PERQINDJE_KLIENTE_SUBJEKTE
        //                                   strKursiCmimiBaze,  // kursi cmimiBaze
        //                                   strCmimiBazeEuro,
        //                                   strKodLevizjeje,   //function getKodiLevizjes nga qytetet
        //                                   strTvsh,    //GetTvshPerqindje GETPERQINDJETVSH
        //                                   null,  // agjensi destinacion pike pike 
        //                                   strAgjensiaRemote,
        //                                   strTerminal,

        //                                   strTerminalSerialBios,
        //                                   strAgjensiaDestinacion, //agjensia Destinacion emri function
        //                                   pReq.KodiSherbimit, //ac ekspres
        //                                   strPerqindjeTakseKarburanti,
        //                                   strValueTakseKarburantiLeke,
        //                                   strValueTakseKarburantiEuro,
        //                                   pReq.KodReference,
        //                                   "0", //frmain get all tvsh
        //                                   strCmimiZbritje,  //discounti
        //                                   strDerguesKunderPagese, // merr vlere nese eshte me kesh             
        //                                   Fshat,
        //                                   QytetNew,
        //                                   pReq.Brandi,
        //                                   pReq.Drejtimi,
        //                                   pReq.AgjensiTranzit,
        //                                   konfirm,
        //                                   objParamMsgType,
        //                                   objParamMsg,
        //                                   objParamId
        //                                );


        //    ret2 = new PodSaveRes();

        //    if (objParamMsgType.Value.ToString() == "Error")
        //    {
        //        ret2.Result = false;
        //        ret2.ResultMessage = objParamMsg.Value.ToString();
        //        ret2.ResultDescription = objParamMsg.Value.ToString();
        //        ret2.ResultMessageTotali = "test";

        //        return ret2;
        //    }


        //    ret2.Result = true;
        //    ret2.ResultMessage = "Pod - i u rregjistrua me sukses!";
        //    //ret2.ResultMessageTotali = "test";
        //    //ret2.ResultDescription = objParamMsg.Value.ToString();
        //    //ret2.PodId =objParamId.Value.ToString();
        //    //ret2.ResultCode = 1;

        //    return ret2;

        //}

        //public bool ExistPod(string podNr)
        //{

        //    bool res = false;
        //    podNr = podNr.ToUpper().Trim();


        //    var query = (from c in dbContext.PODs
        //                 where c.KODI == podNr
        //                 select c
        //                ).Any();

        //    res = query;
        //    return res;
        //}

        //public BindingList<TransactionLogGrumbullime> TransactionLogDorezime(CriteriaTransLogGrumbullimParam param)
        //{
        //    // BindingList<TransactionLogGrumbullime> bindingList = new BindingList<TransactionLogGrumbullime>();
        //    BindingList<TransactionLogGrumbullime> retList = new BindingList<TransactionLogGrumbullime>();
        //    BindingList<TransactionLogGrumbullime> retList2 = new BindingList<TransactionLogGrumbullime>();
        //    BindingList<TransactionLogGrumbullime> returnList = new BindingList<TransactionLogGrumbullime>();

        //    try
        //    {


        //        DateTime dtNga = DateTime.ParseExact(param.pNga, "M/d/yyyy", CultureInfo.InvariantCulture);
        //        DateTime dtDeri = DateTime.ParseExact(param.pDeri, "M/d/yyyy", CultureInfo.InvariantCulture);

        //        DateTime dtNgaMin = new DateTime(dtNga.Year, dtNga.Month, dtNga.Day, 0, 0, 0, 0);
        //        DateTime dtDeriMax = new DateTime(dtDeri.Year, dtDeri.Month, dtDeri.Day, 23, 59, 59, 999);


        //        var query = (from obj in dbContext.Raport_Dorezime
        //                     where
        //                             (obj.Data >= dtNgaMin && obj.Data <= dtDeriMax)
        //                             &&
        //                             (obj.Data >= dtNgaMin && obj.Data <= dtDeriMax)
        //                             &&
        //                             (obj.Derguesi == param.KlientSubjektEmri)
        //                             &&
        //                             (obj.Status_pod_emri == param.pStatus)

        //                     select obj);

        //        if (!String.IsNullOrEmpty(param.nrPOd))
        //            query = query.Where(obj => obj.Pod == param.nrPOd);

        //        foreach (var obj in query)
        //        {

        //            TransactionLogGrumbullime res = new TransactionLogGrumbullime();

        //            res.POD = obj.Pod;
        //            res.AgjensiaDestinacion = obj.Agjensia_Dorezuese;
        //            //res.Agjensia_qe_Paguan = obj.Agjensia_qe_Paguan;
        //            // res.AgjensiaRemote = obj.AgjensiaRemote;
        //            res.Banka = obj.Banka;
        //            res.Cmimi_Baze = obj.Totali.ToString();
        //            // res.Cmimi_me_zbritje = obj.Cmimi_me_zbritje;
        //            res.Data = obj.Data;
        //            res.Derguesi = obj.Derguesi;
        //            // res.Id = obj.;
        //            res.Ka_Sherbime_Kunder_Pagese = obj.Ka_Sherbime_Kunder_Pagese;
        //            res.KlientSubjektDergues = obj.Kliente_Subjekte_Dergues;
        //            res.Kliente_Subjekte_Marres = obj.Kliente_Subjekte_Marres;
        //            res.Kod_Levizje = obj.Kod_Levizje;
        //            res.Kod_Reference = obj.Kod_Reference;
        //            res.Kodi_Produktit = obj.Kodi_Produktit;
        //            res.EmriMarresit = obj.Marres;
        //            res.QytetiMarres = obj.Qyteti_Destinacion;
        //            res.Pesha = obj.Pesha__kg_;
        //            res.VleraKP = obj.Vlera_Kunder_Pagese;
        //            res.Total = obj.Totali;

        //            //if (res.KushPaguan == "PM")
        //            //{
        //            //    res.Total = obj.Total;
        //            //}
        //            //else
        //            //{
        //            //    res.Total = 0;
        //            //}

        //            //res.Status = param.pStatus;

        //            retList = null;

        //            retList2.Add(res);



        //        }

        //        retList = retList2;


        //        return retList;
        //    }



        //    catch (Exception ex)
        //    {

        //        throw ex;


        //    }
        //}

        //public List<PodUpdateReq> GetPod(string nrPod)
        //{

        //    PodUpdateReq podData = new PodUpdateReq();

        //    List<PodUpdateReq> listPod = new List<PodUpdateReq>();

        //    var ret = dbContext.PODs.Where(e => e.KODI == nrPod).Select(e => e).ToList();
        //    if (ret.Count() == 0)
        //    {
        //        var ret1 = dbContext.POD_ORDERS.Where(e => e.KODI == nrPod).Select(e => e).ToList();

        //        foreach (var obj in ret1)
        //        {
        //            // podData.CmimiBaze = obj.CMIMI_ZBRITJE;
        //            podData.Cope = obj.COPE;
        //            podData.AdresaMarresi = obj.MAR_ADRESA;
        //            podData.KlientSubjektDergues = obj.DER_EMRI;
        //            podData.KlientSubjektID = obj.DER_SUBJ_ID.ToString();
        //            podData.KodiPostarMarres = obj.MAR_KODI_POSTAR_ID.ToString();
        //            podData.KodiProduktit = obj.KODI_PRODUKTI_ID.ToString();
        //            podData.KodPershkrimi = obj.KODI_PERSHKRIMIT_ID.ToString();
        //            podData.KushPaguan = obj.PAGUESI_DERGUES_MARRES.ToString();
        //            podData.Marresi = obj.MAR_EMRI;
        //            podData.MenyrePagese = obj.MENYRA_PAGESES_ID.ToString();
        //            podData.MonedhaCmimiBaze = obj.MONEDHA_CMIMI_BAZE_ID.ToString();
        //            podData.MonedhaExtra = obj.MONEDHA_EXTRA_ID.ToString();
        //            podData.Komente = obj.PERSHKRIMI;
        //            podData.Pesha = obj.PESHA;
        //            podData.PODNr = obj.KODI;
        //            podData.QytetiMarres = obj.MAR_QYTETI_ID.ToString();
        //            podData.ShtetiMarres = obj.MAR_SHTETI_ID.ToString();
        //            podData.ShumaSherbimeExtra = obj.SHUMA_SHERBIME_EXTRA;
        //            podData.TelMarresi = obj.MAR_TEL;
        //            podData.Pershkimi = obj.PERSHKRIMI;



        //            if (podData.KushPaguan == "True")
        //            {
        //                podData.CmimiBaze = "0";
        //                double totali = double.Parse(obj.SHUMA_SHERBIME_EXTRA);
        //                podData.Total = totali.ToString("0.00");
        //            }
        //            else
        //            {
        //                if (podData.MonedhaCmimiBaze == "2")
        //                {
        //                    podData.CmimiBaze = obj.CMIMI_ZBRITJE;

        //                    double totali = double.Parse(obj.CMIMI_ZBRITJE) + double.Parse(obj.SHUMA_SHERBIME_EXTRA);
        //                    podData.Total = totali.ToString("0.00");
        //                }

        //                else
        //                {
        //                    //  podData.CmimiBaze = obj.CMIMI_ZBRITJE;

        //                    double result = (double.Parse(obj.CMIMI_ZBRITJE) * 1.2);

        //                    double totali = result + double.Parse(obj.SHUMA_SHERBIME_EXTRA);

        //                    podData.CmimiBaze = result.ToString("0.00");
        //                    podData.Total = totali.ToString("0.00");
        //                }
        //            }

        //            listPod.Add(podData);


        //        }

        //    }
        //    else
        //    {
        //        foreach (var obj in ret)
        //        {
        //            // podData.CmimiBaze = obj.CMIMI_ZBRITJE;
        //            podData.Cope = obj.COPE;
        //            podData.AdresaMarresi = obj.MAR_ADRESA;
        //            podData.KlientSubjektDergues = obj.DER_EMRI;
        //            podData.KlientSubjektID = obj.DER_SUBJ_ID.ToString();
        //            podData.KodiPostarMarres = obj.MAR_KODI_POSTAR_ID.ToString();
        //            podData.KodiProduktit = obj.KODI_PRODUKTI_ID.ToString();
        //            podData.KodPershkrimi = obj.KODI_PERSHKRIMIT_ID.ToString();
        //            podData.KushPaguan = obj.PAGUESI_DERGUES_MARRES.ToString();
        //            podData.Marresi = obj.MAR_EMRI;
        //            podData.MenyrePagese = obj.MENYRA_PAGESES_ID.ToString();
        //            podData.MonedhaCmimiBaze = obj.MONEDHA_CMIMI_BAZE_ID.ToString();
        //            podData.MonedhaExtra = obj.MONEDHA_EXTRA_ID.ToString();
        //            podData.Komente = obj.PERSHKRIMI;
        //            podData.Pesha = obj.PESHA;
        //            podData.PODNr = obj.KODI;
        //            podData.QytetiMarres = obj.MAR_QYTETI_ID.ToString();
        //            podData.ShtetiMarres = obj.MAR_SHTETI_ID.ToString();
        //            podData.ShumaSherbimeExtra = obj.SHUMA_SHERBIME_EXTRA;
        //            podData.TelMarresi = obj.MAR_TEL;
        //            podData.Pershkimi = obj.PERSHKRIMI;
        //            if (podData.KushPaguan == "True")
        //            {
        //                podData.CmimiBaze = "0";

        //                double totali = double.Parse(obj.SHUMA_SHERBIME_EXTRA);
        //                podData.Total = totali.ToString("0.00");

        //            }
        //            else
        //            {
        //                if (podData.MonedhaCmimiBaze == "2")
        //                {
        //                    podData.CmimiBaze = obj.CMIMI_ZBRITJE;

        //                    double totali = double.Parse(obj.CMIMI_ZBRITJE) + double.Parse(obj.SHUMA_SHERBIME_EXTRA);
        //                    podData.Total = totali.ToString("0.00");
        //                }

        //                else
        //                {
        //                    //  podData.CmimiBaze = obj.CMIMI_ZBRITJE;

        //                    double result = (double.Parse(obj.CMIMI_ZBRITJE) * 1.2);

        //                    double totali = result + double.Parse(obj.SHUMA_SHERBIME_EXTRA);

        //                    podData.CmimiBaze = result.ToString("0.00");
        //                    podData.Total = totali.ToString("0.00");
        //                }
        //            }

        //            listPod.Add(podData);
        //        }
        //    }
        //    return listPod;
        //}

        //public PodSaveRes NdryshoPassword(NdryshoPassReq pReq)
        //{
        //    PodSaveRes res = new PodSaveRes();

        //    ObjectParameter objParamMsgType = new ObjectParameter("pMessageType", typeof(string));
        //    ObjectParameter objParamMsg = new ObjectParameter("pMessage", typeof(string));

        //    var result = dbContext.PROC_UPDATE_PASSWORD_PERDORUESIT_KlienteSubjekte(
        //                                                                           pReq.KsID,
        //                                                                           pReq.username,
        //                                                                           pReq.Password,
        //                                                                           pReq.Aktive,
        //                                                                           pReq.Tag,
        //                                                                           pReq.ID,
        //                                                                           objParamMsgType,
        //                                                                           objParamMsg
        //                                                                           );

        //    if (result == 0 || result== null )
        //    {
        //        res.Result = false;
        //        res.ResultDescription = "Ka ndodhur nje gabim. Fjalekalimi nuk eshte ndryshuar!";

        //    }

        //    else
        //    {
        //        res.Result = true;
        //        res.ResultDescription = objParamMsg.Value.ToString();
        //    }

        //    return res;
        //}

        //public string[] Validate(PodSaveReq pReq)
        //{
        //    string str = "";

        //    string[] arr = new string[24];
        //    bool ret = true;

        //    List<string> res = new List<string>();
        //    if (pReq.AdresaMarresi == "" || pReq.AdresaMarresi == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni adresen e marresit!";
        //        res.Add(str);
        //        arr[0] = str;
        //    }

        //    if (pReq.Cope == "" || pReq.Cope == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni nr e copeve!";
        //        res.Add(str);
        //        arr[1] = str;
        //    }


        //    if (pReq.PODNr == "" || pReq.PODNr == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem vendoosni peshen e dergese!";
        //        res.Add(str);
        //        arr[2] = str;
        //    }

        //    if (pReq.KodiProduktit == "" || pReq.KodiProduktit == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni kodin e produktit!";
        //        res.Add(str);
        //        arr[3] = str;
        //    }


        //    if (pReq.KodPershkrimi == "" || pReq.KodPershkrimi == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni kodin e pershkrimit!";
        //        res.Add(str);
        //        arr[4] = str;
        //    }

        //    if (pReq.KushPaguan == "" || pReq.KushPaguan == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem zgjidhni kush paguan!";
        //        res.Add(str);
        //        arr[5] = str;
        //    }

        //    if (pReq.MenyrePagese == "" || pReq.MenyrePagese == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem zgjidhni menyren e pageses Me Kesh ose Me Kredi!";
        //        res.Add(str);
        //        arr[6] = str;
        //    }

        //    //if (pReq.PODNr == "" || pReq.PODNr == null)
        //    //{
        //    //    ret = false;
        //    //    str = "Ju lutem vendoosni nr e dergeses!";
        //    //    res.Add(str);
        //    //    arr[7] = str;
        //    //}

        //    if (pReq.Pesha == "" || pReq.Pesha == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni nr e peshes!";
        //        res.Add(str);

        //        arr[7] = str;
        //    }
        //    if (pReq.QytetiMarres == "" || pReq.QytetiMarres == null)
        //    {
        //        if (pReq.KodiLevizjes == "AL-KS" || pReq.KodiLevizjes == "AL-NM" || pReq.KodiLevizjes == "AL-GR" || pReq.KodiLevizjes == "AL-BOTE" || pReq.KodiLevizjes == "") {

        //        }
        //        else
        //        {
        //            ret = false;
        //            str = "Ju lutem plotesoni Qytetin!";
        //            res.Add(str);

        //            arr[8] = str;
        //        }

        //    }
        //    if (pReq.Marresi == "" || pReq.Marresi == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Emrin e Marresit!";
        //        res.Add(str);

        //        arr[9] = str;
        //    }
        //    if (pReq.CmimiBazeTry == "" || pReq.CmimiBazeTry == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Cmimin Baze!";
        //        res.Add(str);

        //        arr[10] = str;
        //    }
        //    if (pReq.ShtetiMarres == "" || pReq.ShtetiMarres == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Shtetin!";
        //        res.Add(str);

        //        arr[11] = str;
        //    }
        //    if (pReq.Korrieri == "" || pReq.Korrieri == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Korrierin!";
        //        res.Add(str);

        //        arr[12] = str;
        //    }
        //    if (pReq.Destinacion == "" || pReq.Destinacion == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Destinacionin!";
        //        res.Add(str);

        //        arr[13] = str;
        //    }
        //    if (pReq.QytetFshat == "" || pReq.QytetFshat == null)
        //    {
        //        if (pReq.isNational == true)
        //        {
        //            ret = false;
        //            str = "Ju lutem plotesoni Njesin Administrative!";
        //            res.Add(str);

        //            arr[19] = str;
        //        }
        //    }
        //    if (pReq.Levizja == "" || pReq.Levizja == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Levizjen!";
        //        res.Add(str);

        //        arr[14] = str;
        //    }
        //    if (pReq.Drejtimi == "" || pReq.Drejtimi == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Drejtimin!";
        //        res.Add(str);

        //        arr[15] = str;
        //    }
        //    if (pReq.Brandi == "" || pReq.Brandi == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Brandin!";
        //        res.Add(str);

        //        arr[16] = str;
        //    }
        //    if (pReq.KodiSherbimit == "" || pReq.KodiSherbimit == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Kodin e Sherbimit!";
        //        res.Add(str);

        //        arr[17] = str;
        //    }
        //    if (pReq.KodiLevizjes == "" || pReq.KodiLevizjes == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Kodin e Levizjes!";
        //        res.Add(str);

        //        arr[18] = str;
        //    }
        //    if (pReq.Derguesi == "" || pReq.Derguesi == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Derguesin!";
        //        res.Add(str);

        //        arr[20] = str;
        //    }
        //    if (pReq.AdresaDerguesi == "" || pReq.AdresaDerguesi == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Adresen e Derguesit!";
        //        res.Add(str);

        //        arr[21] = str;
        //    }
        //    if (pReq.ShtetiDergues == "" || pReq.ShtetiDergues == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Shtetin Dergues!";
        //        res.Add(str);

        //        arr[22] = str;
        //    }
        //    if (pReq.QytetiDergues == "" || pReq.QytetiDergues == null)
        //    {
        //        ret = false;
        //        str = "Ju lutem plotesoni Qytetin Dergues!";
        //        res.Add(str);

        //        arr[23] = str;
        //    }
        //    //if (pReq.KodiLevizjes == "" || pReq.KodiLevizjes == null)
        //    //{
        //    //    ret = false;
        //    //    str = "Ju lutem plotesoni Kodin e Levizjes!";
        //    //    res.Add(str);

        //    //    arr[24] = str;
        //    //}
        //    //if (pReq.KodiLevizjes == "" || pReq.KodiLevizjes == null)
        //    //{
        //    //    ret = false;
        //    //    str = "Ju lutem plotesoni Kodin e Levizjes!";
        //    //    res.Add(str);

        //    //    arr[25] = str;
        //    //}
        //    if (ret == true)
        //    {

        //        return arr = null; ;
        //    }
        //    else
        //    {
        //        return arr;
        //    }



        //}


        #endregion


        #region Code

        //test



        //

        #region Arb Koci

        #endregion

        #region Romeisa Aliu

        #endregion

        #endregion


    }

}