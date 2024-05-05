package arki.chat.interceptor;

import arki.chat.annotation.TokenRequired;
import arki.chat.server.ChatWSServer;
import arki.chat.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.invoke.MethodHandle;
import java.util.logging.Logger;

@Component
public class AuthenticationInterceptor implements HandlerInterceptor {

    private static final Logger LOGGER = Logger.getLogger(AuthenticationInterceptor.class.getName());

    @Autowired
    private JWTService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            String token = request.getHeader("Authorization").substring(7);
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            TokenRequired tokenRequired = handlerMethod.getMethodAnnotation(TokenRequired.class);
            TokenRequired classTokenRequired = handlerMethod.getClass().getAnnotation(TokenRequired.class);
            if ( (tokenRequired != null && tokenRequired.value()) ||( classTokenRequired != null && classTokenRequired.value())){
                if (token == null || !jwtService.verifyJWT(token)){
                    LOGGER.warning("Token is null or token can not be verified!");
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.getWriter().write("Access Denied");
                    return false;
                }
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
    }
}
