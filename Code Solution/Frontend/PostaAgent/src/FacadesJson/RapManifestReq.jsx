import HmacSHA256 from "crypto-js/hmac-sha256";
export function RapManifestReq() {
  this.NrRendor = "1";
  this.NrFature = "";
  this.Data = "";
  this.Pesha = "";
  this.KodSherbimiD = "";
  this.KodSherbimiP = "";
  this.KodSherbimiDK = "";
  this.KodSherbimiPK = "";
  this.VleraMallit = "";
  this.TarifaPostare = "";
  this.Emri = "";
  this.Qyteti = "";
  this.Adresa = "";
  this.NrTelefoni = "";
  this.KushPaguan = "";
  this.AdreseEmer = "";
  this.Status = "";
  this.KlientSubjektID = "";
  this.MenyrePageseKesh = "";
  this.MenyrePageseKredi = "";
  this.Token = HmacSHA256(
    Math.round(new Date().getTime() / 1000).toString(),

    window.UserP.key
  ).toString();
  this.username = window.UserP.username;
}
