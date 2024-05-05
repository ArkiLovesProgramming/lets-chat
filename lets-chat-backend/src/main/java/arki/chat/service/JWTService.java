package arki.chat.service;

import arki.chat.pojo.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * JWT service, used to manage JWT logic
 */
@Service
public class JWTService {
    // private key, this is symmetric encryption
    private static String key = "chat1231231231231dadasdasdsadas";
    public String getJWT(User user){
        Date start = new Date();
        long expiredTime = System.currentTimeMillis() + 60*60*1000;
        Date expired = new Date(expiredTime);
        // add properties into playload
        String token = JWT.create().withAudience(String.valueOf(user.getId())).withIssuedAt(start).withExpiresAt(expired)
                .withClaim("userId", user.getId())
                .sign(Algorithm.HMAC256(key));
        return token;
    }

    public Boolean verifyJWT(String token){
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(key)).build();
        DecodedJWT jwt;
        try {
            jwt = verifier.verify(token);
        } catch (JWTVerificationException e){
            System.out.println("客户端客户的 Token 验证失败！ token=" + token);
            return false;
        }
        return true;
    }

    public String getUserIdByToken(String token){
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(key)).build();
        DecodedJWT jwt;
        String userId;
        try {
            jwt = verifier.verify(token);
            userId = jwt.getClaim("id").asString();
        } catch (JWTVerificationException e){
            System.out.println("客户端客户的 Token 验证失败！ token=" + token);
            return null;
        }
        return userId;
    }
}