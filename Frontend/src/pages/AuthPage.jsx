import React, { useState } from "react";
import hospitalImage from "../assets/imgs/vitalworks-hospital-ward-1338585_1920.jpg";
import "./AuthPage.css";

export default function AuthPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const email = String(values.get("email")).trim();
    // Simulação sem credenciais persistidas ou requisição para uma API.
    form.reset();
    onLogin({ name: "Usuário", email });
  }

  return (
    <section className="auth-page" aria-labelledby="auth-title">
      <div className="auth-image">
        <img
          src={hospitalImage}
          alt="Leitos e equipamentos em uma sala hospitalar"
        />
        <div className="auth-welcome">
          <h2>Boas-vindas ao HEMEC.</h2>
          <p>
            Equipamentos, chamados e atendimentos reunidos para apoiar a rotina
            de quem cuida.
          </p>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-content">
          <a href="#inicio" className="auth-back">
            Voltar ao início
          </a>
          <h1 id="auth-title">Entrar no HEMEC</h1>
          <p className="auth-description">
            Acesse o HEMEC para acompanhar a manutenção dos equipamentos.
          </p>
          <form onSubmit={submit}>
            <div className="auth-field">
              <label htmlFor="auth-email">E-mail</label>
              <input
                id="auth-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                maxLength={254}
                placeholder="nome@exemplo.com"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="auth-password">Senha</label>
              <input
                id="auth-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                minLength={6}
                aria-describedby="auth-password-hint"
              />
              <span id="auth-password-hint" className="auth-hint">
                Use pelo menos 6 caracteres.
              </span>
            </div>
            <label className="auth-show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(event) => setShowPassword(event.target.checked)}
              />
              Mostrar senha
            </label>
            <button className="auth-submit" type="submit">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
