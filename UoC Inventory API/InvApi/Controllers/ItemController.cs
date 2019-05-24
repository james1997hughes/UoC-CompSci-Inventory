using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InvAPI.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace InvAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ItemContext _context;
        public ItemController(ItemContext context)
        {
            _context = context;

        }
        //GET: api/item
        //Returns all items in database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryItem>>> getInvItems()
        {
            return await _context.Inventory.ToListAsync();
        }

        //GET: api/item/[ID]
        //Returns item based on id
        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryItem>> GetInvItem(string Id)
        {
            var invItem = await _context.Inventory.FindAsync(Id);
            if(invItem == null)
            {
                return NotFound();
            }
            return invItem;
        }
       
        //POST: api/item/[NEWID]
        //Creates new item in database
        [HttpPost]
        public void Post([FromBody]string scrambledData)
        {
            InventoryItem jsonData = JsonConvert.DeserializeObject<InventoryItem>(scrambledData);

            var ItemToAdd = new InventoryItem
            {
                Id = jsonData.Id,
                DeviceType = jsonData.DeviceType,
                SerialNumber = jsonData.SerialNumber,
                MID = jsonData.MID,
                Category = jsonData.Category,
                Comments = jsonData.Comments,
                Loaned = false,
                StudentNo = null,
                SignOutDate = null
            };
            _context.Inventory.Add(ItemToAdd);
            _context.SaveChanges();
        }

        //PATCH: api/item/[ID]
        //Updates item in database with only the new info
        [HttpPatch("{id}")]
        public void Patch(string id, [FromBody]string updateData)
        {
           InventoryItem itemToUpdate = _context.Inventory.Single(item => item.Id == id);
           InventoryItem itemToCompare = JsonConvert.DeserializeObject<InventoryItem>(updateData);
            if (itemToUpdate.Id != itemToCompare.Id && itemToCompare.Id != null)
            {
                itemToUpdate.Id = itemToCompare.Id;
            }
            if (itemToUpdate.DeviceType != itemToCompare.Id && itemToCompare.DeviceType != null)
            {
                itemToUpdate.DeviceType = itemToCompare.DeviceType;
            }
            if (itemToUpdate.Category != itemToCompare.Category && itemToCompare.Category != null)
            {
                itemToUpdate.Category = itemToCompare.Category;
            }
            if (itemToUpdate.SerialNumber != itemToCompare.SerialNumber && itemToCompare.SerialNumber != null)
            {
                itemToUpdate.SerialNumber = itemToCompare.SerialNumber;
            }
            if (itemToUpdate.MID != itemToCompare.MID && itemToCompare.MID != null)
            {
                itemToUpdate.MID = itemToCompare.MID;
            }
            if (itemToUpdate.Loaned != itemToCompare.Loaned && itemToCompare.Loaned != null)
            {
                itemToUpdate.Loaned = itemToCompare.Loaned;
            }
            if (itemToUpdate.StudentNo != itemToCompare.StudentNo && itemToCompare.StudentNo != null)
            {
                itemToUpdate.StudentNo = itemToCompare.StudentNo;
            }
            if (itemToUpdate.SignOutDate != itemToCompare.SignOutDate && itemToCompare.SignOutDate != null)
            {
                itemToUpdate.SignOutDate = itemToCompare.SignOutDate;
            }
            if (itemToUpdate.Comments != itemToCompare.Comments && itemToCompare.Comments != null)
            {
                itemToUpdate.Comments = itemToCompare.Comments;
            }
            _context.SaveChanges();
        }

        //Delete: api/item/[ID]
        //Deletes the item with Id == id in database
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            InventoryItem itemToDelete = _context.Inventory.Single(item => item.Id == id);
            _context.Inventory.Remove(itemToDelete);
            _context.SaveChanges();
        }

        //GET: api/item/student/[StudentNo]
        [HttpGet("bystudent/{StudentNo}")]
        public async Task<ActionResult<List<InventoryItem>>> GetLoanedForStudent(string StudentNo)
        {
            return await _context.Inventory.Where(item => item.StudentNo == StudentNo).ToListAsync();
        }
    }
}
