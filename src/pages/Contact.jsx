function ContactUs() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('/api/contact', formData)
        .then(() => alert('Thank you! We will contact you soon.'))
        .catch((error) => console.log(error));
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>பெயர்:</label>
        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        
        <label>மின்னஞ்சல்:</label>
        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        
        <label>செய்தி:</label>
        <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
        
        <button type="submit">அனுப்பவும்</button>
      </form>
    );
  }
  