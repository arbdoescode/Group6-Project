import HmacSHA256 from "crypto-js/hmac-sha256";
export function PodKosovaReq() {
  this.NrRendor = "1";
  this.Pod = "";
  this.Derguesi = "";
  this.AdresaDerguesit = "";
  this.KodSherbimiD = "";
  this.KodSherbimiP = "";
  this.KodSherbimiDK = "";
  this.KodSherbimiPK = "";
  this.Pesha = "";
  this.VleraMallit = "";
  this.TarifaPostare = "";
  this.Emri = "";
  this.Qyteti = "";
  this.Adresa = "";
  this.NrTelefoni = "";
  this.KushPaguan = "";
  this.Status = "";
  this.VleraEuro = "";
  this.VleraLeke = "";
  this.KlientSubjektID = "";
  this.MenyrePageseKesh = "";
  this.MenyrePageseKredi = "";
  this.Token = HmacSHA256(
    Math.round(new Date().getTime() / 1000).toString(),

    window.UserP.key
  ).toString();
  this.username = window.UserP.username;
}
