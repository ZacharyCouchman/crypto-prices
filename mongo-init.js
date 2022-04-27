db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'cryptodb',
    },
  ],
});
db.createCollection('cryptos');
