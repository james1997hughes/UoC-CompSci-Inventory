using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvAPI.Models
{
    public class InventoryItem
    {
        public string Id { get; set; }
        public string DeviceType { get; set; }
        public string SerialNumber { get; set; }
        public string MID { get; set; }
        public bool Loaned { get; set; }
        public string Category { get; set; }
        public Nullable<DateTime> SignOutDate { get; set; }
        public string StudentNo { get; set; }
        public string Comments { get; set; }


    }
}
