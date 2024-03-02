import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/api/excel/upload").permitAll() // Permit access to this endpoint without authentication
                .anyRequest().authenticated() // Require authentication for other endpoints
                .and()
            .formLogin() // Configure form login
                .loginPage("/login") // Specify custom login page URL if needed
                .permitAll(); // Permit access to the login page without authentication
    }
}
