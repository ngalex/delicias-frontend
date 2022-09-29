import { supabase } from "../supabase/supabase";

//Productos
export const getProductos = async () => {
  const { error, data } = await supabase.from("productos").select();
  if (error) throw error;
  return data;
};

export const getProductoById = async (id) => {
  const { error, data } = await supabase
    .from("productos")
    .select()
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

//Productores
export const getProductores = async () => {
  const { error, data } = await supabase.from("productores").select();
  if (error) throw error;
  return data;
};
export const getProductorById = async (id) => {
  const { error, data } = await supabase
    .from("productores")
    .select()
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};
//Clientes
export const getClientes = async () => {
  const { error, data } = await supabase.from("clientes").select();
  if (error) throw error;
  return data;
};

export const getClienteById = async (id) => {
  const { error, data } = await supabase.from("clientes").select().eq("id", id).single();
  if (error) throw error;
  return data;
};

export const addCliente = async (cliente) => {
  const response = await supabase.from("clientes").insert(cliente);
  return response;
};
//Pedidos
//Obtener todos los pedidos
export const getPedidos = async () => {
  const { error, data } = await supabase.from("pedidos").select();
  if (error) throw error;
  return data;
};

export const getPedidoById = async (id) => {
  const { error, data } = await supabase.from("pedidos").select().eq("id", id).single();
  if (error) throw error;
  return data;
};

//Insertar un pedido
//Ejemplo de agregar pedido
// addPedido(
//     {
//       direccionEntrega: "prueba9999",
//       fechaEntrega: "2022/02/19",
//       estado: "pendiente",
//       montoTotal: 100,
//       anticipo: 50,
//       delivery: true,
//       productor_id: 1,
//       cliente_id: 1
//     },
//     [
//       {
//         cantidad: 100,
//         color:"negro",
//         producto_id: 1
//       },
//       {
//         cantidad: 100,
//         color:"rojo",
//         producto_id: 1
//       }
//     ]
//   ).then(data =>{
//     console.log(data)
//   })
export const addPedido = async (pedido, detalle_producto) => {
  if (detalle_producto === []) return;

  const { error, data } = await supabase.from("pedidos").insert(pedido);
  if (error) throw error;
  const detalles = [];
  detalle_producto.forEach((detalle) => {
    let det = Object.assign(detalle, { pedido_id: data[0].id });
    detalles.push(det);
  });
  addDetallesProductos(detalles);
  console.log(detalles);
  return data;
};
//Actualizar un pedido parametros (id de pedido a actualizar y un objeto con los campos actualizados)
export const updatePedido = async (pedido_id, pedidoActualizado) => {
  const { error, data } = await supabase
    .from("pedidos")
    .update(pedidoActualizado)
    .eq("id", pedido_id);
  if (error) throw error;
  return data;
};
//Detalle de Producto
const addDetallesProductos = async (detalles) => {
  const { error, data } = await supabase
    .from("detalle_producto")
    .insert(detalles);
  if (error) throw error;
  return data;
};
