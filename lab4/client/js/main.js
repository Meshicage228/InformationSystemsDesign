document.getElementById('addLetterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const sender = document.getElementById('sender').value;
    const recipient = document.getElementById('recipient').value;
    const date = document.getElementById('date').value;
    const isRegistered = document.getElementById('isRegistered').checked;

    const response = await fetch('http://localhost:3000/letters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sender, recipient, date, isRegistered })
    });

    if (response.ok) {
        alert('Letter added successfully');
    }
});

async function fetchLetters() {
    const response = await fetch('http://localhost:3000/letters');
    const letters = await response.json();
    const lettersList = document.getElementById('lettersList');
    lettersList.innerHTML = letters.map(letter => `
        <div>
            <p>Sender: ${letter.sender}</p>
            <p>Recipient: ${letter.recipient}</p>
            <p>Date: ${letter.date}</p>
            <p>Registered: ${letter.isRegistered}</p>
            <button onclick="deleteLetter('${letter._id}')">Delete</button>
            <button onclick="editLetter('${letter._id}')">Edit</button>
        </div>
    `).join('');
}

async function deleteLetter(id) {
    await fetch(`http://localhost:3000/letters/${id}`, { method: 'DELETE' });
    fetchLetters();
}

async function editLetter(id) {
    const sender = prompt('Enter new sender');
    const recipient = prompt('Enter new recipient');
    const date = prompt('Enter new date');
    const isRegistered = confirm('Is it registered?');

    await fetch(`http://localhost:3000/letters/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sender, recipient, date, isRegistered })
    });

    fetchLetters();
}

fetchLetters();