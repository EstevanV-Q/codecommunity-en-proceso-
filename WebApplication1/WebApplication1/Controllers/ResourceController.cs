using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Services;
using WebApplication1.Interfaces;
using WebApplication1.Models.DTOs;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResourceController : ControllerBase
    {
        private readonly IResourceService _resourceService;

        public ResourceController(IResourceService resourceService)
        {
            _resourceService = resourceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resource>>> GetAll()
        {
            var resources = await _resourceService.GetAllResourcesAsync();
            return Ok(resources);
        }

        [HttpGet("published")]
        public async Task<ActionResult<IEnumerable<Resource>>> GetPublished()
        {
            var resources = await _resourceService.GetPublishedResourcesAsync();
            return Ok(resources);
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<Resource>>> GetByCategory(string category)
        {
            var resources = await _resourceService.GetResourcesByCategoryAsync(category);
            return Ok(resources);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Resource>> GetById(int id)
        {
            var resource = await _resourceService.GetResourceByIdAsync(id);
            if (resource == null)
                return NotFound();
            return Ok(resource);
        }

        [HttpPost]
        public async Task<ActionResult<Resource>> Create(ResourceDto resourceDto)
        {
            var resource = await _resourceService.CreateResourceAsync(resourceDto);
            return CreatedAtAction(nameof(GetById), new { id = resource.Id }, resource);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Resource>> Update(int id, ResourceDto resourceDto)
        {
            var resource = await _resourceService.UpdateResourceAsync(id, resourceDto);
            if (resource == null)
                return NotFound();
            return Ok(resource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _resourceService.DeleteResourceAsync(id);
            return NoContent();
        }
    }
} 