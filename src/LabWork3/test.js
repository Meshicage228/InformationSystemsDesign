document.getElementById('btn1').addEventListener('click', function() {
	document.querySelectorAll('input[type="text"]:nth-child(odd)').forEach(function(field) {
		if (!field.value.includes('(after content)')) {
			field.value += '(after content)';
		}
	});
	
	document.querySelectorAll('input[type="text"]:nth-child(even)').forEach(function(field) {
		field.style.opacity = 0;
	});
});

document.getElementById('btn2').addEventListener('click', function() {
	document.querySelector('#list li:first-child').style.visibility = 'hidden';
	document.querySelector('#list li:last-child').style.visibility = 'hidden';
	
	document.querySelectorAll('p').forEach(function(para) {
		para.style.color = '#666';
		para.style.fontStyle = 'italic';
	});
});