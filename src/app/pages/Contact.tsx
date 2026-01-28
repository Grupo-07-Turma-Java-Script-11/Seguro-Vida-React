import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      details: ["(11) 4000-0000", "0800 123 4567"],
    },
    {
      icon: Mail,
      title: "E-mail",
      details: ["contato@vidasegura.com.br", "suporte@vidasegura.com.br"],
    },
    {
      icon: MapPin,
      title: "Endereço",
      details: ["Av. Paulista, 1000", "São Paulo - SP, 01310-100"],
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      details: ["Segunda a Sexta: 8h às 18h", "Sábado: 9h às 13h"],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos aqui para ajudar. Fale conosco e tire suas dúvidas sobre nossos planos e serviços.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Envie sua Mensagem
              </h2>
              <p className="text-gray-600 mb-8">
                Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Como podemos ajudar você?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-2 min-h-32"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="mr-2 size-5" />
                  Enviar Mensagem
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h2>
              <p className="text-gray-600 mb-8">
                Entre em contato pelos nossos canais de atendimento ou visite nosso escritório.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <info.icon className="size-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {info.title}
                          </h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-600">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-gray-200 rounded-lg overflow-hidden h-64">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <MapPin className="size-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-600 text-white rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Atendimento de Emergência 24/7
            </h2>
            <p className="text-xl text-red-100 mb-6">
              Em caso de sinistro ou emergência, entre em contato imediatamente:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold">
                <Phone className="size-5" />
                <span>0800 123 4567</span>
              </div>
              <div className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold">
                <Mail className="size-5" />
                <span>emergencia@vidasegura.com.br</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}