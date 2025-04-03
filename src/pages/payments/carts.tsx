import { Interface } from "readline";

interface Curso {
  id: string;
  title: string;
  description: string;
  price: number;
  img: string;
}

interface ItemCarrito {
  curso: Curso;
  cantidad: number;
}

interface Compra{
    id: string;
    fecha: string;
    total: number;
    items: ItemCarrito[];
    estado: 'completada' | 'pendiente' | 'cancelada';
    // metodoPago: 'tarjeta' | 'transferencia' | 'paypal';
}

interface Suscripcion {
    id: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado: 'activa' | 'inactiva' | 'cancelada';
    plan: 'mensual' | 'anual';
    precio: number;
}

interface EstadoApp{
    itemsCarrito: ItemCarrito[];
    compras: Compra[];
    suscripciones: Suscripcion[];
}

import React from "react";
