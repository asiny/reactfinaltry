import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';

// Item component
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>{name + ' ✓'}</del> // Strikethrough and ✓ if packed
      ) : (
        name // Normal if not packed
      )}
    </li>
  );
}

// Örnek 1 - Basit Component
function Welcome(props) {
  return <h1 className="welcome">Merhaba, {props.name}</h1>;
}

// Örnek 2 - Props ile Veri Aktarımı
function UserCard({ name, age, city }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Yaş: {age}</p>
      <p>Şehir: {city}</p>
    </div>
  );
}

// Örnek 3 - İç İçe Componentler
function Avatar({ user }) {
  return (
    <img
      className="avatar"
      src={user.avatar}
      alt={user.name}
    />
  );
}

function UserInfo({ user }) {
  return (
    <div className="user-info">
      <Avatar user={user} />
      <div className="user-info-name">{user.name}</div>
    </div>
  );
}

function Comment({ author, text }) {
  return (
    <div className="comment">
      <UserInfo user={author} />
      <div className="comment-text">{text}</div>
    </div>
  );
}

// Code Block Component
function CodeBlock({ code }) {
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );
}

// PackingList Deneme
function PackingList() {
  return (
    <article className="example-box">
      <h2>Örnek: Paketleme Listesi</h2>
      <ul>
        <Item name="Toothbrush" isPacked={true} />
        <Item name="Towel" isPacked={false} />
        <Item name="Shoes" isPacked={true} />
        <Item name="Sunscreen" isPacked={false} />
        <Item name="Hat" isPacked={true} />
      </ul>
      <CodeBlock code={`function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>{name + ' ✓'}</del>
      ) : (
        name
      )}
    </li>
  );
}`} />
    </article>
  );
}

// Örnek 4 - Map Kullanımı
function ProductList() {
  const products = [
    { id: 1, name: 'Laptop', price: 15000 },
    { id: 2, name: 'Telefon', price: 8000 },
    { id: 3, name: 'Tablet', price: 5000 },
    { id: 4, name: 'Kulaklık', price: 1000 },
  ];

  return (
    <div className="product-list">
      <h3>Ürünler (KDV Dahil)</h3>
      <ul>
        {products.map(product => (
          <li key={product.id} className="product-item">
            {product.name}: {product.price * 1.18} TL
          </li>
        ))}
      </ul>
    </div>
  );
}

// Örnek 5 - Filter Kullanımı
function ExpensiveProducts() {
  const products = [
    { id: 1, name: 'Laptop', price: 15000 },
    { id: 2, name: 'Telefon', price: 8000 },
    { id: 3, name: 'Tablet', price: 5000 },
    { id: 4, name: 'Kulaklık', price: 1000 },
  ];

  const expensiveProducts = products.filter(product => product.price > 5000);

  return (
    <div className="product-list">
      <h3>Pahalı Ürünler (5000 TL üzeri)</h3>
      <ul>
        {expensiveProducts.map(product => (
          <li key={product.id} className="product-item">
            {product.name}: {product.price} TL
          </li>
        ))}
      </ul>
    </div>
  );
}

// Örnek 6 - Event Handler
function ButtonExample() {
  function handleClick() {
    alert('You clicked me!');
  }

  function handleMouseOver() {
    console.log('Mouse is over the button!');
  }

  function handleMouseOut() {
    console.log('Mouse left the button!');
  }

  return (
    <div className="button-container">
      <h3>Event Handler Örnekleri</h3>
      <button 
        className="event-button"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Click me
      </button>
    </div>
  );
}

// Örnek 8 - useState Hook
function CounterExample() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Sayaca hoş geldiniz!');

  function handleIncrement() {
    setCount(count + 1);
    if (count + 1 >= 5) {
      setMessage('Wow, çok sayıyorsunuz!');
    }
  }

  function handleDecrement() {
    setCount(count - 1);
    if (count - 1 < 5) {
      setMessage('Sayaca hoş geldiniz!');
    }
  }

  function handleReset() {
    setCount(0);
    setMessage('Sayaç sıfırlandı!');
  }

  return (
    <div className="counter-container">
      <h3>useState Hook Örneği</h3>
      <p className="message">{message}</p>
      <div className="counter-value">Sayaç: {count}</div>
      <div className="counter-buttons">
        <button className="counter-button" onClick={handleDecrement}>-</button>
        <button className="counter-button" onClick={handleReset}>Sıfırla</button>
        <button className="counter-button" onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}

// Örnek 9 - State Yönetimi ve Stateful/Stateless Components
function StatefulComponent() {
  const [title, setTitle] = useState('Başlık');
  const [description, setDescription] = useState('Açıklama');

  function handleTitleChange() {
    setTitle('Yeni Başlık - ' + new Date().toLocaleTimeString());
  }

  function handleDescriptionChange() {
    setDescription('Yeni Açıklama - ' + new Date().toLocaleTimeString());
  }

  return (
    <div className="state-example">
      <div className="state-content">
        <StatelessComponent 
          title={title} 
          description={description}
        />
      </div>
      <div className="state-buttons">
        <button className="state-button" onClick={handleTitleChange}>
          Başlığı Değiştir
        </button>
        <button className="state-button" onClick={handleDescriptionChange}>
          Açıklamayı Değiştir
        </button>
      </div>
    </div>
  );
}

// Stateless (Presentational) Component
function StatelessComponent({ title, description }) {
  return (
    <div className="stateless-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Örnek 10 - Form Handling
function FormExample() {
  const [inputValue, setInputValue] = useState('');

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="form-container">
      <h3>Form Handling Örneği</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Bir şeyler yazın..."
        className="form-input"
      />
      <p className="input-display">Girilen değer: {inputValue}</p>
    </div>
  );
}

// Örnek 11 - Multiple State Management
function MultiStateExample() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  return (
    <div className="multi-state-container">
      <h3>Multiple State Örneği</h3>
      <div className="input-group">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Başlık"
          className="form-input"
        />
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Miktar"
          className="form-input"
        />
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="form-input"
        />
      </div>
      <div className="state-display">
        <p>Başlık: {title}</p>
        <p>Miktar: {amount}</p>
        <p>Tarih: {date}</p>
      </div>
    </div>
  );
}

// Örnek 12 - Single Object State
function SingleObjectStateExample() {
  const [userInput, setUserInput] = useState({
    title: '',
    amount: '',
    date: ''
  });

  function handleInputChange(event, field) {
    setUserInput(prevState => ({
      ...prevState,
      [field]: event.target.value
    }));
  }

  return (
    <div className="object-state-container">
      <h3>Single Object State Örneği</h3>
      <div className="input-group">
        <input
          type="text"
          value={userInput.title}
          onChange={(e) => handleInputChange(e, 'title')}
          placeholder="Başlık"
          className="form-input"
        />
        <input
          type="number"
          value={userInput.amount}
          onChange={(e) => handleInputChange(e, 'amount')}
          placeholder="Miktar"
          className="form-input"
        />
        <input
          type="date"
          value={userInput.date}
          onChange={(e) => handleInputChange(e, 'date')}
          className="form-input"
        />
      </div>
      <div className="state-display">
        <p>Başlık: {userInput.title}</p>
        <p>Miktar: {userInput.amount}</p>
        <p>Tarih: {userInput.date}</p>
      </div>
    </div>
  );
}

// Örnek 13 - Axios ile GET Request
function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data.slice(0, 5)); // İlk 5 postu al
        setLoading(false);
      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="posts-container">
      <h3>Blog Yazıları</h3>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Örnek 14 - useEffect Hook Kullanımları
function UseEffectExamples() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 1. Her render'da çalışır
  useEffect(() => {
    console.log('Her render\'da çalışır');
  });

  // 2. Sadece ilk render'da çalışır
  useEffect(() => {
    console.log('Sadece ilk render\'da çalışır');
  }, []);

  // 3. Dependency değiştiğinde çalışır
  useEffect(() => {
    console.log('Count değiştiğinde çalışır:', count);
  }, [count]);

  // 4. Cleanup fonksiyonu ile
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="effect-examples">
      <h3>useEffect Hook Örnekleri</h3>
      
      <div className="effect-section">
        <h4>1. Her Render</h4>
        <button 
          className="effect-button"
          onClick={() => setCount(c => c + 1)}
        >
          Count: {count}
        </button>
      </div>

      <div className="effect-section">
        <h4>2. İlk Render</h4>
        <p>Console'da kontrol edin</p>
      </div>

      <div className="effect-section">
        <h4>3. Dependency Değişimi</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="İsim girin"
          className="effect-input"
        />
      </div>

      <div className="effect-section">
        <h4>4. Cleanup Function</h4>
        <p>Pencere Genişliği: {windowWidth}px</p>
      </div>
    </div>
  );
}

// Örnek 15 - MySQL Database Integration
function DatabaseExample() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Normalde bu kısım backend'de olmalı, bu sadece örnek amaçlı
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/students');
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError('Veritabanından veri çekilirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="loading">Veriler yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;
  if (students.length === 0) return <div className="no-data">Veri bulunamadı</div>;

  return (
    <div className="database-container">
      <h3>Öğrenci Listesi</h3>
      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Bölüm</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Örnek 16 - Promise ve Asenkron İşlemler
function PromiseExample() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ÖRNEK 1: Temel Promise Oluşturma
  // Promise constructor'ı iki parametre alır: resolve (başarı) ve reject (hata)
  const createBasicPromise = () => {
    return new Promise((resolve, reject) => {
      // Promise içinde asenkron bir işlem simüle ediyoruz
      setTimeout(() => {
        const success = true; // Bu değeri false yaparak reject durumunu test edebilirsiniz
        
        if (success) {
          resolve("İşlem başarılı!"); // Başarılı durumda resolve çağrılır
        } else {
          reject(new Error("Bir hata oluştu!")); // Hata durumunda reject çağrılır
        }
      }, 2000); // 2 saniye gecikme
    });
  };

  // ÖRNEK 2: Promise Chain (Promise Zinciri)
  // then() metodları ile zincirleme işlemler yapılabilir
  const chainExample = () => {
    setLoading(true);
    setError(null);

    // İç içe Promise kullanımı yerine chain yapısı kullanılır
    fetchUser(1)                    // İlk Promise: Kullanıcı bilgilerini getir
      .then(user => {
        setResult(prev => prev + `\nKullanıcı bulundu: ${user.name}`);
        return fetchUserPosts(user.id); // İkinci Promise: Kullanıcının postlarını getir
      })
      .then(posts => {
        setResult(prev => prev + `\nPost sayısı: ${posts.length}`);
        return fetchPostComments(posts[0].id); // Üçüncü Promise: İlk postun yorumlarını getir
      })
      .then(comments => {
        setResult(prev => prev + `\nYorum sayısı: ${comments.length}`);
      })
      .catch(error => {             // Herhangi bir aşamada hata olursa catch bloğu çalışır
        setError(`Hata oluştu: ${error.message}`);
      })
      .finally(() => {             // Her durumda finally bloğu çalışır
        setLoading(false);
      });
  };

  // ÖRNEK 3: Promise.all() Kullanımı
  // Birden fazla Promise'i paralel olarak çalıştırma
  const parallelExample = () => {
    setLoading(true);
    setError(null);

    // Tüm Promise'ler paralel olarak çalışır
    Promise.all([
      fetchUser(1),              // Promise 1
      fetchUserPosts(1),         // Promise 2
      fetchPostComments(1)       // Promise 3
    ])
      .then(([user, posts, comments]) => {
        // Tüm Promise'ler tamamlandığında çalışır
        setResult(`
          Kullanıcı: ${user.name}
          Post Sayısı: ${posts.length}
          Yorum Sayısı: ${comments.length}
        `);
      })
      .catch(error => {
        // Herhangi bir Promise hata verirse catch çalışır
        setError(`Parallel işlemde hata: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ÖRNEK 4: async/await Kullanımı
  // Promise'leri daha okunabilir şekilde kullanma
  const asyncExample = async () => {
    setLoading(true);
    setError(null);

    try {
      // await ile Promise'in tamamlanması beklenir
      const user = await fetchUser(1);
      setResult(`Kullanıcı: ${user.name}`);

      const posts = await fetchUserPosts(user.id);
      setResult(prev => prev + `\nPost Sayısı: ${posts.length}`);

      const comments = await fetchPostComments(posts[0].id);
      setResult(prev => prev + `\nYorum Sayısı: ${comments.length}`);
    } catch (error) {
      // try/catch ile hata yakalama
      setError(`Async işlemde hata: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Mock API çağrıları (Promise döndüren fonksiyonlar)
  const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id, name: 'John Doe' });
      }, 1000);
    });
  };

  const fetchUserPosts = (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' }
        ]);
      }, 1000);
    });
  };

  const fetchPostComments = (postId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id: 1, text: 'Comment 1' },
          { id: 2, text: 'Comment 2' }
        ]);
      }, 1000);
    });
  };

  return (
    <article className="example-box">
      <h2>Örnek 16: Promise ve Asenkron İşlemler</h2>
      
      <div className="buttons">
        <button onClick={() => chainExample()}>Promise Chain</button>
        <button onClick={() => parallelExample()}>Promise.all</button>
        <button onClick={() => asyncExample()}>Async/Await</button>
      </div>

      {loading && <div className="loading">Yükleniyor...</div>}
      {error && <div className="error">{error}</div>}
      {result && <pre className="result">{result}</pre>}

      <div className="explanation">
        <h3>Önemli Noktalar:</h3>
        <ul>
          <li>Promise üç durumda olabilir: pending (bekliyor), fulfilled (başarılı), rejected (hata)</li>
          <li>then() metodu Promise zinciri oluşturmak için kullanılır</li>
          <li>catch() metodu hataları yakalamak için kullanılır</li>
          <li>finally() metodu her durumda çalışır</li>
          <li>Promise.all() birden fazla Promise'i paralel çalıştırır</li>
          <li>async/await, Promise'leri daha okunabilir şekilde kullanmamızı sağlar</li>
        </ul>
      </div>

      <CodeBlock code={`// 1. Temel Promise Oluşturma
const myPromise = new Promise((resolve, reject) => {
  // Asenkron işlem
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Başarılı!");
    } else {
      reject(new Error("Hata!"));
    }
  }, 2000);
});

// 2. Promise Chain Kullanımı
fetchUser(1)
  .then(user => fetchUserPosts(user.id))
  .then(posts => fetchPostComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.error(error))
  .finally(() => console.log("İşlem tamamlandı"));

// 3. Promise.all Kullanımı
Promise.all([
  fetchUser(1),
  fetchUserPosts(1),
  fetchPostComments(1)
])
  .then(([user, posts, comments]) => {
    console.log(user, posts, comments);
  });

// 4. async/await Kullanımı
async function getData() {
  try {
    const user = await fetchUser(1);
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchPostComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    console.error(error);
  }
}`} />
    </article>
  );
}

// Ana Component
function App() {
  return (
    <div className="container">
      <h1 className="main-title">React Components Örnekleri</h1>
      
      <article className="example-box">
        <h2>Örnek 1: Basit Component</h2>
        <Welcome name="Ahmet" />
        <CodeBlock code={`function Welcome(props) {
  return <h1 className="welcome">Merhaba, {props.name}</h1>;
}

// Kullanımı:
<Welcome name="Ahmet" />`} />
        <p className="example-note">
          * En temel React component yapısını gösterir.<br/>
          * Props ile dışarıdan veri alabilir.<br/>
          * Tek bir JSX elementi döndürür.<br/>
          * Karşılama sayfaları, başlıklar ve basit UI elementleri için kullanılır.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 2: Props ile Veri Aktarımı</h2>
        <UserCard name="Ayşe" age={25} city="İstanbul" />
        <CodeBlock code={`function UserCard({ name, age, city }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Yaş: {age}</p>
      <p>Şehir: {city}</p>
    </div>
  );
}`} />
        <p className="example-note">
          * Props'ları destructuring ile alır.<br/>
          * Birden fazla prop kullanımını gösterir.<br/>
          * Kart yapısında veri gösterimi sağlar.<br/>
          * Profil kartları, ürün kartları ve bilgi gösterimi için kullanılır.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 3: İç İçe Componentler</h2>
        <Comment 
          author={{
            name: "Mehmet",
            avatar: "https://via.placeholder.com/50"
          }}
          text="Harika bir yazı!"
        />
        <CodeBlock code={`function Avatar({ user }) {
  return (
    <img
      className="avatar"
      src={user.avatar}
      alt={user.name}
    />
  );
}

function UserInfo({ user }) {
  return (
    <div className="user-info">
      <Avatar user={user} />
      <div className="user-info-name">{user.name}</div>
    </div>
  );
}

function Comment({ author, text }) {
  return (
    <div className="comment">
      <UserInfo user={author} />
      <div className="comment-text">{text}</div>
    </div>
  );
}

// Kullanımı:
<Comment 
  author={{
    name: "Mehmet",
    avatar: "https://via.placeholder.com/50"
  }}
  text="Harika bir yazı!"
/>`} />
        <p className="example-note">
          * Component kompozisyonunu gösterir.<br/>
          * Karmaşık UI yapılarını küçük parçalara böler.<br/>
          * Props ile obje göndermeyi gösterir.<br/>
          * Sosyal medya yorumları, mesajlaşma sistemleri ve nested yapılar için kullanılır.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 4: Koşullu Render (Paketleme Listesi)</h2>
        <PackingList />
        <p className="example-note">
          * Koşullu render işlemini gösterir (ternary operator kullanımı).<br/>
          * Boolean prop kullanımını gösterir.<br/>
          * Liste öğelerinin farklı durumlarını yönetir.<br/>
          * Yapılacaklar listesi, alışveriş listesi ve durum takibi gerektiren listeler için kullanılır.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 5: Map Kullanımı</h2>
        <ProductList />
        <CodeBlock code={`function ProductList() {
  const products = [
    { id: 1, name: 'Laptop', price: 15000 },
    { id: 2, name: 'Telefon', price: 8000 },
    { id: 3, name: 'Tablet', price: 5000 },
    { id: 4, name: 'Kulaklık', price: 1000 },
  ];

  return (
    <div className="product-list">
      <h3>Ürünler (KDV Dahil)</h3>
      <ul>
        {products.map(product => (
          <li key={product.id} className="product-item">
            {product.name}: {product.price * 1.18} TL
          </li>
        ))}
      </ul>
    </div>
  );
}`} />
        <p className="example-note">
          * Array.map() ile liste render etmeyi gösterir.<br/>
          * Her öğe için key prop kullanımını gösterir.<br/>
          * Veri listelerini dinamik olarak gösterir.<br/>
          * Ürün listeleri, kullanıcı listeleri ve tekrarlı içerikler için kullanılır.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 6: Filter Kullanımı</h2>
        <ExpensiveProducts />
        <CodeBlock code={`function ExpensiveProducts() {
  const products = [
    { id: 1, name: 'Laptop', price: 15000 },
    { id: 2, name: 'Telefon', price: 8000 },
    { id: 3, name: 'Tablet', price: 5000 },
    { id: 4, name: 'Kulaklık', price: 1000 },
  ];

  const expensiveProducts = products.filter(product => product.price > 5000);

  return (
    <div className="product-list">
      <h3>Pahalı Ürünler (5000 TL üzeri)</h3>
      <ul>
        {expensiveProducts.map(product => (
          <li key={product.id} className="product-item">
            {product.name}: {product.price} TL
          </li>
        ))}
      </ul>
    </div>
  );
}`} />
        <p className="example-note">
          * Array.filter() ile veri filtrelemeyi gösterir.<br/>
          * Filtrelenmiş veriyi map ile render eder.<br/>
          * Koşullu veri gösterimini sağlar.<br/>
          * Arama sonuçları, kategori filtreleme ve veri filtreleme işlemleri için kullanılır.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 7: Event Handlers</h2>
        <ButtonExample />
        <CodeBlock code={`function ButtonExample() {
  function handleClick() {
    alert('You clicked me!');
  }

  function handleMouseOver() {
    console.log('Mouse is over the button!');
  }

  function handleMouseOut() {
    console.log('Mouse left the button!');
  }

  return (
    <div className="button-container">
      <h3>Event Handler Örnekleri</h3>
      <button 
        className="event-button"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Click me
      </button>
    </div>
  );
}`} />
        <p className="example-note">
          * Event handler fonksiyonlarının kullanımını gösterir.<br/>
          * Farklı event türlerini gösterir (onClick, onMouseOver, onMouseOut).<br/>
          * Kullanıcı etkileşimlerini yönetir.<br/>
          * Butonlar, formlar ve interaktif UI elementleri için kullanılır.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 8: useState Hook</h2>
        <CounterExample />
        <CodeBlock code={`import React, { useState } from 'react';

function CounterExample() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Sayaca hoş geldiniz!');

  function handleIncrement() {
    setCount(count + 1);
    if (count + 1 >= 5) {
      setMessage('Wow, çok sayıyorsunuz!');
    }
  }

  function handleDecrement() {
    setCount(count - 1);
    if (count - 1 < 5) {
      setMessage('Sayaca hoş geldiniz!');
    }
  }

  function handleReset() {
    setCount(0);
    setMessage('Sayaç sıfırlandı!');
  }

  return (
    <div className="counter-container">
      <h3>useState Hook Örneği</h3>
      <p className="message">{message}</p>
      <div className="counter-value">Sayaç: {count}</div>
      <div className="counter-buttons">
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleReset}>Sıfırla</button>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}`} />
        <p className="example-note">
          * useState hook'unun temel kullanımını gösterir.<br/>
          * Birden fazla state yönetimini gösterir.<br/>
          * State'e bağlı UI güncellemelerini gösterir.<br/>
          * Sayaçlar, formlar, toggle butonları ve dinamik içerik için kullanılır.<br/>
          * State değişikliklerine bağlı olarak farklı mesajlar göstermeyi örnekler.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 9: State Yönetimi ve Stateful/Stateless Components</h2>
        <StatefulComponent />
        <CodeBlock code={`// Stateful (Container) Component
function StatefulComponent() {
  const [title, setTitle] = useState('Başlık');
  const [description, setDescription] = useState('Açıklama');

  function handleTitleChange() {
    setTitle('Yeni Başlık - ' + new Date().toLocaleTimeString());
  }

  function handleDescriptionChange() {
    setDescription('Yeni Açıklama - ' + new Date().toLocaleTimeString());
  }

  return (
    <div className="state-example">
      <div className="state-content">
        <StatelessComponent 
          title={title} 
          description={description}
        />
      </div>
      <div className="state-buttons">
        <button onClick={handleTitleChange}>Başlığı Değiştir</button>
        <button onClick={handleDescriptionChange}>Açıklamayı Değiştir</button>
      </div>
    </div>
  );
}

// Stateless (Presentational) Component
function StatelessComponent({ title, description }) {
  return (
    <div className="stateless-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}`} />
        <p className="example-note">
          * useState hook'u component içinde tanımlanmalıdır.<br/>
          * Her state değişikliği bağımsızdır ve kendi state'ini yönetir.<br/>
          * Stateful component state'i yönetir ve alt componentlere props olarak geçirir.<br/>
          * Stateless component sadece props alır ve render eder.<br/>
          * State değiştiğinde React componenti otomatik olarak yeniden render eder.<br/>
          * State yönetimi genellikle üst componentlerde yapılır (Container pattern).<br/>
          * Alt componentler mümkün olduğunca stateless tutulmalıdır (Presentational pattern).
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 10: Form Handling</h2>
        <FormExample />
        <CodeBlock code={`function FormExample() {
  const [inputValue, setInputValue] = useState('');

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="form-container">
      <h3>Form Handling Örneği</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Bir şeyler yazın..."
      />
      <p>Girilen değer: {inputValue}</p>
    </div>
  );
}`} />
        <p className="example-note">
          * Form elemanlarının değerlerini state ile yönetmeyi gösterir.<br/>
          * event.target.value ile input değerini almayı gösterir.<br/>
          * Controlled component örneğidir.<br/>
          * Form elemanları için temel kullanımı gösterir.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 11: Multiple State Management</h2>
        <MultiStateExample />
        <CodeBlock code={`function MultiStateExample() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  return (
    <div className="multi-state-container">
      <h3>Multiple State Örneği</h3>
      <input type="text" value={title} onChange={handleTitleChange} />
      <input type="number" value={amount} onChange={handleAmountChange} />
      <input type="date" value={date} onChange={handleDateChange} />
      <div>
        <p>Başlık: {title}</p>
        <p>Miktar: {amount}</p>
        <p>Tarih: {date}</p>
      </div>
    </div>
  );
}`} />
        <p className="example-note">
          * Birden fazla state'i ayrı ayrı yönetmeyi gösterir.<br/>
          * Her input için ayrı state ve handler kullanımını gösterir.<br/>
          * Farklı input tipleriyle çalışmayı gösterir.<br/>
          * Form verilerini ayrı state'lerde tutma yaklaşımını gösterir.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 12: Single Object State</h2>
        <SingleObjectStateExample />
        <CodeBlock code={`function SingleObjectStateExample() {
  const [userInput, setUserInput] = useState({
    title: '',
    amount: '',
    date: ''
  });

  function handleInputChange(event, field) {
    setUserInput(prevState => ({
      ...prevState,
      [field]: event.target.value
    }));
  }

  return (
    <div className="object-state-container">
      <h3>Single Object State Örneği</h3>
      <input
        type="text"
        value={userInput.title}
        onChange={(e) => handleInputChange(e, 'title')}
      />
      <input
        type="number"
        value={userInput.amount}
        onChange={(e) => handleInputChange(e, 'amount')}
      />
      <input
        type="date"
        value={userInput.date}
        onChange={(e) => handleInputChange(e, 'date')}
      />
      <div>
        <p>Başlık: {userInput.title}</p>
        <p>Miktar: {userInput.amount}</p>
        <p>Tarih: {userInput.date}</p>
      </div>
    </div>
  );
}`} />
        <p className="example-note">
          * Tüm form verilerini tek bir state objesinde tutmayı gösterir.<br/>
          * Spread operatör (...) kullanımını gösterir.<br/>
          * Dinamik obje property güncellemeyi gösterir.<br/>
          * Daha ölçeklenebilir state yönetimi yaklaşımını gösterir.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 13: Axios ile GET Request</h2>
        <PostList />
        <CodeBlock code={`import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="posts-container">
      <h3>Blog Yazıları</h3>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`} />
        <p className="example-note">
          * Axios ile HTTP GET request yapma örneği.<br/>
          * useEffect hook'u ile component mount olduğunda veri çekme.<br/>
          * async/await syntax kullanımı.<br/>
          * Loading ve error state yönetimi.<br/>
          * Try-catch ile hata yakalama.<br/>
          * Alınan verileri state'e kaydetme ve listeleme.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 14: useEffect Hook Kullanımları</h2>
        <UseEffectExamples />
        <CodeBlock code={`function UseEffectExamples() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 1. Her render'da çalışır
  useEffect(() => {
    console.log('Her render\'da çalışır');
  });

  // 2. Sadece ilk render'da çalışır
  useEffect(() => {
    console.log('Sadece ilk render\'da çalışır');
  }, []);

  // 3. Dependency değiştiğinde çalışır
  useEffect(() => {
    console.log('Count değiştiğinde çalışır:', count);
  }, [count]);

  // 4. Cleanup fonksiyonu ile
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="İsim girin"
      />
      <p>Pencere Genişliği: {windowWidth}px</p>
    </div>
  );
}`} />
        <p className="example-note">
          * useEffect hook'unun dört farklı kullanım şekli.<br/>
          * Dependency array kullanımı ve önemi.<br/>
          * Cleanup fonksiyonunun kullanımı ve memory leak önleme.<br/>
          * Component lifecycle ile ilişkisi.<br/>
          * Side effect'lerin yönetimi.<br/>
          * Event listener'ların doğru kullanımı.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 15: MySQL Database Integration</h2>
        <DatabaseExample />
        <CodeBlock code={`// Backend (dbService.js)
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if(err) {
    console.log(err.message);
  }
  console.log('Student db in MySQL is ' + connection.state);
});

class DbService {
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM students;";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

// Frontend (React Component)
function DatabaseExample() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/students');
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError('Veritabanından veri çekilirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="database-container">
      <h3>Öğrenci Listesi</h3>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Bölüm</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`} />
        <p className="example-note">
          * MySQL veritabanı bağlantısı ve veri çekme örneği.<br/>
          * Backend'de DbService sınıfı ile veritabanı işlemleri.<br/>
          * Frontend'de useEffect ile veri çekme.<br/>
          * Loading ve error state yönetimi.<br/>
          * Tablo formatında veri gösterimi.<br/>
          * .env dosyası ile güvenli veritabanı bağlantısı.<br/>
          * Promise ve async/await kullanımı.<br/>
          * Error handling ve durum yönetimi.
        </p>
      </article>

      <article className="example-box">
        <h2>Örnek 16: Promise ve Asenkron İşlemler</h2>
        <PromiseExample />
        <CodeBlock code={`// 1. Temel Promise Oluşturma
const myPromise = new Promise((resolve, reject) => {
  // Asenkron işlem
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Başarılı!");
    } else {
      reject(new Error("Hata!"));
    }
  }, 2000);
});

// 2. Promise Chain Kullanımı
fetchUser(1)
  .then(user => fetchUserPosts(user.id))
  .then(posts => fetchPostComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.error(error))
  .finally(() => console.log("İşlem tamamlandı"));

// 3. Promise.all Kullanımı
Promise.all([
  fetchUser(1),
  fetchUserPosts(1),
  fetchPostComments(1)
])
  .then(([user, posts, comments]) => {
    console.log(user, posts, comments);
  });

// 4. async/await Kullanımı
async function getData() {
  try {
    const user = await fetchUser(1);
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchPostComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    console.error(error);
  }
}`} />
        <p className="example-note">
          * Promise üç durumda olabilir: pending (bekliyor), fulfilled (başarılı), rejected (hata)<br/>
          * then() metodu Promise zinciri oluşturmak için kullanılır<br/>
          * catch() metodu hataları yakalamak için kullanılır<br/>
          * finally() metodu her durumda çalışır<br/>
          * Promise.all() birden fazla Promise'i paralel çalıştırır<br/>
          * async/await, Promise'leri daha okunabilir şekilde kullanmamızı sağlar
        </p>
      </article>
    </div>
  );
}

// Rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
