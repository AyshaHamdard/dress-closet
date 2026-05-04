export default function HomeView() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Welcome to Dress Closet</h1>

      <p>
        Dress Closet is a simple fashion catalog app where you can browse,
        add, edit, and manage clothing items stored in a database.
        It is designed to help users organize outfit ideas and keep track
        of different dresses with details like color, size, brand, and price.
      </p>

      {/* Image BELOW text */}
      <div style={{ marginTop: '30px' }}>
        <img
          src="/dress.png"
          alt="Dress"
          style={{
          width: '300px',
          height: 'auto',
          borderRadius: '12px',
          display: 'block',
          margin: '20px auto 0 auto'
          }}
        />
      </div>
    </div>
  );
}