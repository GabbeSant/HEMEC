import React, { useState } from "react";
import hospitalImage from "../assets/imgs/vitalworks-hospital-ward-1338585_1920.jpg";
import "./AuthPage.css";

export default function AuthPage({ register = false, onLogin, onRegister, registered }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get("name") || "").trim();
    const email = String(values.get("email")).trim();
    const password = String(values.get("password"));
    if (register && name.length < 2) {
      setError("Informe seu nome com pelo menos dois caracteres.");
      form.elements.namedItem("name").focus();
      return;
    }
    if (register && password !== values.get("confirmation")) {
      setError("As senhas não coincidem. Confira a confirmação da senha.");
      form.elements.namedItem("confirmation").focus();
      return;
    }
    setError("");
    // Simulação sem credenciais persistidas ou requisição para uma API.
    form.reset();
    if (register) onRegister();
    else onLogin({ name: "Usuário de demonstração", email });
  }

  return (
    <section className={`auth-page${register ? " auth-page-register" : ""}`} aria-labelledby="auth-title">
      <div className="auth-image">
        <img src={hospitalImage} alt="Leitos e equipamentos em uma sala hospitalar" />
        <div className="auth-welcome">
          <h2>{register ? "Seu cuidado começa aqui." : "Boas-vindas ao HEMEC."}</h2>
          <p>{register
            ? "Conheça uma forma de organizar os equipamentos e acompanhar cada etapa da manutenção hospitalar."
            : "Equipamentos, chamados e atendimentos reunidos para apoiar a rotina de quem cuida."}</p>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-content">
          <a href="#inicio" className="auth-back">Voltar ao início</a>
          <h1 id="auth-title">{register ? "Criar conta" : "Entrar no HEMEC"}</h1>
          <p className="auth-description">{register ? "Preencha seus dados para experimentar o cadastro." : "Acesse a demonstração para consultar os equipamentos."}</p>
          <p className="auth-demo" id="auth-demo">Acesso simulado. Use dados fictícios e uma senha de teste. Nenhuma conta real será criada e sua senha não será salva.</p>
          {!register && registered && <p className="auth-success" role="status">Cadastro simulado concluído. Entre com um e-mail e uma senha de teste para continuar.</p>}
          <form onSubmit={submit} aria-describedby="auth-demo">
            {register && <div className="auth-field">
              <label htmlFor="auth-name">Nome completo</label>
              <input id="auth-name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Seu nome completo" />
            </div>}
            <div className="auth-field">
              <label htmlFor="auth-email">E-mail</label>
              <input id="auth-email" name="email" type="email" autoComplete="username" required maxLength={254} placeholder="nome@exemplo.com" />
            </div>
            <div className="auth-field">
              <label htmlFor="auth-password">Senha</label>
              <input id="auth-password" name="password" type={showPassword ? "text" : "password"} autoComplete={register ? "new-password" : "current-password"} required minLength={6} aria-describedby="auth-password-hint" />
              <span id="auth-password-hint" className="auth-hint">Use pelo menos 6 caracteres.</span>
            </div>
            {register && <div className="auth-field">
              <label htmlFor="auth-confirmation">Confirmar senha</label>
              <input id="auth-confirmation" name="confirmation" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={6} />
            </div>}
            <label className="auth-show-password"><input type="checkbox" checked={showPassword} onChange={event => setShowPassword(event.target.checked)} />Mostrar {register ? "senhas" : "senha"}</label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button className="auth-submit" type="submit">{register ? "Criar conta" : "Entrar"}</button>
          </form>
          <p className="auth-switch">{register ? "Já possui uma conta?" : "Ainda não possui uma conta?"} <a href={register ? "#/login" : "#/cadastro"}>{register ? "Entrar" : "Criar conta"}</a></p>
        </div>
      </div>
    </section>
  );
}
