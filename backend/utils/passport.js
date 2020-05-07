"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const pool = require('./mysqlConnection');

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {};
  console.log("in auth function !!!")
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = secret;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      const user_id = jwt_payload.user_id;
      console.log("in passport",user_id)
      let sql = "SELECT * FROM `users` WHERE `id` = ? "
      pool.query(sql, user_id,(err, sqlResult) => {
        if (err) {
          console.log("one")
          return done(err, null);
        }
        if (sqlResult) {
          console.log("two")
          return done(null, sqlResult);
        } else 
        {
          return done(null, false);
        }
      });
    })
  );
}
const checkAuth = passport.authenticate("jwt", { session: false });

exports.auth = auth;
exports.checkAuth = checkAuth;