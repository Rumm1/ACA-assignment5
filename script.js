function updateDateTime() {
  const now = new Date();
  const options = { 
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  };
  const formatted = now.toLocaleString('en-US', options);
  document.getElementById('date-time-block').textContent = formatted;
}
setInterval(updateDateTime, 1000);
updateDateTime();
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.aca-accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.classList.remove('active');
                    const otherContent = document.getElementById(otherHeader.getAttribute('id').replace('Heading', 'Content'));
                    otherContent.classList.remove('active');
                }
            });
            
            this.classList.toggle('active');
            const content = document.getElementById(this.getAttribute('id').replace('Heading', 'Content'));
            content.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initAccordion();
});
