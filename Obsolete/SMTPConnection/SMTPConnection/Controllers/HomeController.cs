using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SMTPConnection.Models;

namespace SMTPConnection.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            string host = "smtp.office365.com";
            int port = 587;

            using (SmtpClient client = new SmtpClient(host, port))
            {
                client.Credentials = new System.Net.NetworkCredential("5019TEST@csmb365.onmicrosoft.com", "gs4atbRc");
                client.EnableSsl = true;
                var mm = new MailMessage
                {
                    Subject = "Hello",
                    Body = "Hello",
                    From = new MailAddress("5019TEST@csmb365.onmicrosoft.com"),
                };
                mm.To.Add("p.underhill@chester.ac.uk");
                client.Send(mm); 
            }

            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
