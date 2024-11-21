export const RequestUrl = (name) => {
    const url = {
        "ClientCount": "http://127.0.0.1:4000/api/v1/clientes/count",
        "VentasCount":"http://127.0.0.1:4000/api/v1/ventas/count",
        "ComprasCount":"http://127.0.0.1:4000/api/v1/compras/count",
        "ultimateClient":"http://127.0.0.1:4000/api/v1/clientes/ultimos",
        "saveClient": "http://127.0.0.1:4000/api/v1/clienteRegister",
        "GetClient": "http://127.0.0.1:4000/api/v1/clientes",
        "deleteClient": "http://127.0.0.1:4000/api/v1/cliente/",
        "updateClient": "http://127.0.0.1:4000/api/v1/cliente/",
        "GetUser":"http://127.0.0.1:4000/api/v1/usuarios",
        "saveUser":"http://127.0.0.1:4000/api/v1/usuario",
        "updateUser":"http://127.0.0.1:4000/api/v1/usuario/",
        "deleteUser":"http://127.0.0.1:4000/api/v1/usuario",
        "saveDispositivo":"http://127.0.0.1:4000/api/v1/dispositivo",
        "updateDispositivo":"http://127.0.0.1:4000/api/v1/dispositivo/",
        "GetDispositivo":"http://127.0.0.1:4000/api/v1/dispositivos",
        "deleteDispositivo":"http://127.0.0.1:4000/api/v1/dispositivo/",
        "GetReparacion":"http://127.0.0.1:4000/api/v1/reparaciones",
        "saveReparacion":"http://127.0.0.1:4000/api/v1/reparacion",
        "GetProduct":"http://127.0.0.1:4000/api/v1/productos",
        "saveProduct":"http://127.0.0.1:4000/api/v1/producto",
        "saveVenta":"http://127.0.0.1:4000/api/v1/venta",
        "saveVentaDetalles":"http://127.0.0.1:4000/api/v1/detalles_venta",
        "updateProduct":"http://127.0.0.1:4000/api/v1/producto",
        "deleteProduct":"http://127.0.0.1:4000/api/v1/producto",
        "GetVenta":"http://127.0.0.1:4000/api/v1/detalles_ventas/detallado",
        "GetProveedor":"http://127.0.0.1:4000/api/v1/proveedores",
        "saveProveedor":"http://127.0.0.1:4000/api/v1/proveedor",
        "updateProveedor":"http://127.0.0.1:4000/api/v1/proveedor",
        "deleteProveedor":"http://127.0.0.1:4000/api/v1/proveedor",
        "GetCompra":"http://127.0.0.1:4000/api/v1/compra_detalles/details",
        "saveCompra":"http://127.0.0.1:4000/api/v1/compra",
        "saveCompraDetalles":"http://127.0.0.1:4000/api/v1/detalles_compra",
        "updateCompra":"http://127.0.0.1:4000/api/v1/compra"
    }

    return url[name] ?? "N/A"

}