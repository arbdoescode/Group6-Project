//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AcApi
{
    using System;
    using System.Collections.Generic;
    
    public partial class KLIENTE_SUBJEKTE
    {
        public long ID { get; set; }
        public string KODI { get; set; }
        public string EMRI { get; set; }
        public string ADRESA { get; set; }
        public long QYTETI_ID { get; set; }
        public long SHTETI_ID { get; set; }
        public string TEL { get; set; }
        public Nullable<long> KODI_POSTAR_ID { get; set; }
        public bool AKTIVE { get; set; }
        public string NIPT { get; set; }
        public string EMAIL { get; set; }
        public string PERSON_KONTAKTI { get; set; }
        public Nullable<long> MENYRE_PAGESE_ID { get; set; }
        public Nullable<System.DateTime> DateCreated { get; set; }
        public Nullable<System.DateTime> DateUpdated { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public string Emer_Administratori { get; set; }
    }
}
