using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class JobPosting
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Company { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public List<string> Requirements { get; set; }
        public string Salary { get; set; }
        public string ContactEmail { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string Type { get; set; } // full-time, part-time, contract, freelance
        public string WorkMode { get; set; } // remote, hybrid, on-site
    }
} 