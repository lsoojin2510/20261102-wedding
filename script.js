// 사진 클릭 시 원본 파일을 확대해서 보여주는 팝업
const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightboxImage');
const copyModal=document.getElementById('copyModal');
let previousFocus=null;
function openDialog(dialog){previousFocus=document.activeElement;dialog.hidden=false;document.body.style.overflow='hidden';dialog.querySelector('button')?.focus();}
function closeDialog(dialog){dialog.hidden=true;document.body.style.overflow='';previousFocus?.focus();}
document.querySelectorAll('.zoomable').forEach(photo=>photo.addEventListener('click',()=>{lightboxImage.src=photo.src;lightboxImage.alt=photo.alt;openDialog(lightbox);}));
document.getElementById('closeLightbox').addEventListener('click',()=>closeDialog(lightbox));
lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeDialog(lightbox)});
// 계좌번호 복사 후 완료 팝업 표시 (HTTPS 또는 localhost 권장)
async function copyText(text){if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(text);return;}const input=document.createElement('textarea');input.value=text;input.style.position='fixed';input.style.opacity='0';document.body.appendChild(input);input.select();const success=document.execCommand('copy');input.remove();if(!success)throw new Error('복사 실패');}
document.querySelectorAll('.copy-btn').forEach(button=>button.addEventListener('click',async()=>{try{await copyText(button.dataset.copy);document.getElementById('copyTitle').textContent='계좌번호 복사 완료';copyModal.querySelector('p').textContent='계좌번호가 클립보드에 복사되었습니다.';}catch(error){document.getElementById('copyTitle').textContent='복사할 계좌번호';copyModal.querySelector('p').textContent=button.dataset.copy;}openDialog(copyModal);}));
document.getElementById('closeModal').addEventListener('click',()=>closeDialog(copyModal));
copyModal.addEventListener('click',event=>{if(event.target===copyModal)closeDialog(copyModal)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(!lightbox.hidden)closeDialog(lightbox);if(!copyModal.hidden)closeDialog(copyModal);}});
