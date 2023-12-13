document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('hidden');
  });
  
  document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('hidden');
  });
  