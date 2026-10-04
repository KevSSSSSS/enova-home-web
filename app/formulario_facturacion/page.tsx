"use client";

import SidebarAdministrador from "../components/SidebarAdministrador";

export default function FormularioFacturacionPage() {
    return (
        <main className="min-h-screen px-4 sm:px-6 pt-32 pb-8 sm:pb-12">

            <div className="flex flex-col md:flex-row gap-8 md:gap-0">

                {/* =====================================================
                    SIDEBAR ADMINISTRADOR
                ====================================================== */}

                <SidebarAdministrador />


                {/* =====================================================
                    CONTENIDO PRINCIPAL
                ====================================================== */}

                <div className="flex-1 min-w-0 w-full">

                    <div className="w-full max-w-7xl mx-auto">

                        {/* =================================================
                            TÍTULO
                        ================================================== */}

                        <div className="mb-8">

                            <h1 className="text-3xl font-semibold text-[#3E4234]">
                                Facturación
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Registro de información para la emisión de comprobantes fiscales.
                            </p>

                        </div>


                        {/* =================================================
                            FORMULARIO PRINCIPAL
                        ================================================== */}

                        <div
                            className="
                                bg-white
                                rounded-lg
                                shadow-md
                                border
                                border-[#D6D6CF]
                                overflow-hidden
                            "
                        >

                            {/* =================================================
                                ENCABEZADO
                            ================================================== */}

                            <div
                                className="
                                    bg-[#E7E7E5]
                                    px-6
                                    py-5
                                    border-b
                                    border-[#D6D6CF]
                                "
                            >

                                <h2 className="text-xl font-semibold text-[#3E4234]">
                                    Datos de facturación
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Información necesaria para generar el comprobante fiscal.
                                </p>

                            </div>


                            <div className="p-6">


                                {/* =================================================
                                    1. DATOS DEL COMPROBANTE
                                ================================================== */}

                                <section className="mb-10">

                                    <div className="mb-5">

                                        <h3 className="text-lg font-semibold text-[#3E4234]">
                                            1. Datos del comprobante
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Información general del CFDI.
                                        </p>

                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                                        {/* Tipo de comprobante */}

                                        <div>

                                            <label
                                                htmlFor="tipoComprobante"
                                                className="block text-sm font-medium text-[#3E4234] mb-2"
                                            >
                                                Tipo de comprobante
                                            </label>

                                            <select
                                                id="tipoComprobante"
                                                defaultValue=""
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    bg-white
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            >

                                                <option value="" disabled>
                                                    Seleccione
                                                </option>

                                                <option value="I">
                                                    I - Ingreso
                                                </option>

                                                <option value="E">
                                                    E - Egreso
                                                </option>

                                                <option value="T">
                                                    T - Traslado
                                                </option>

                                                <option value="N">
                                                    N - Nómina
                                                </option>

                                                <option value="P">
                                                    P - Pago
                                                </option>

                                            </select>

                                        </div>


                                        {/* Serie */}

                                        <div>

                                            <label
                                                htmlFor="serie"
                                                className="block text-sm font-medium text-[#3E4234] mb-2"
                                            >
                                                Serie
                                            </label>

                                            <input
                                                id="serie"
                                                type="text"
                                                placeholder="Ej. A"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Folio */}

                                        <div>

                                            <label
                                                htmlFor="folio"
                                                className="block text-sm font-medium text-[#3E4234] mb-2"
                                            >
                                                Folio
                                            </label>

                                            <input
                                                id="folio"
                                                type="text"
                                                placeholder="Número de folio"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Fecha */}

                                        <div>

                                            <label
                                                htmlFor="fecha"
                                                className="block text-sm font-medium text-[#3E4234] mb-2"
                                            >
                                                Fecha y hora de emisión
                                            </label>

                                            <input
                                                id="fecha"
                                                type="datetime-local"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Moneda */}

                                        <div>

                                            <label
                                                htmlFor="moneda"
                                                className="block text-sm font-medium text-[#3E4234] mb-2"
                                            >
                                                Moneda
                                            </label>

                                            <select
                                                id="moneda"
                                                defaultValue="MXN"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    bg-white
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            >

                                                <option value="MXN">
                                                    MXN - Peso mexicano
                                                </option>

                                                <option value="USD">
                                                    USD - Dólar estadounidense
                                                </option>

                                                <option value="EUR">
                                                    EUR - Euro
                                                </option>

                                            </select>

                                        </div>


                                        {/* Tipo de cambio */}

                                        <div>

                                            <label
                                                htmlFor="tipoCambio"
                                                className="block text-sm font-medium text-[#3E4234] mb-2"
                                            >
                                                Tipo de cambio
                                            </label>

                                            <input
                                                id="tipoCambio"
                                                type="number"
                                                step="0.0001"
                                                placeholder="Ej. 1.0000"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Lugar de expedición */}

                                        <div>

                                            <label
                                                htmlFor="lugarExpedicion"
                                                className="block text-sm font-medium text-[#3E4234] mb-2"
                                            >
                                                Lugar de expedición
                                            </label>

                                            <input
                                                id="lugarExpedicion"
                                                type="text"
                                                placeholder="Código postal"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Exportación */}

                                        <div>

                                            <label
                                                htmlFor="exportacion"
                                                className="block text-sm font-medium text-[#3E4234] mb-2"
                                            >
                                                Exportación
                                            </label>

                                            <select
                                                id="exportacion"
                                                defaultValue="01"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    bg-white
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            >

                                                <option value="01">
                                                    01 - No aplica
                                                </option>

                                                <option value="02">
                                                    02 - Definitiva
                                                </option>

                                                <option value="03">
                                                    03 - Temporal
                                                </option>

                                                <option value="04">
                                                    04 - Definitiva con pedimento
                                                </option>

                                            </select>

                                        </div>


                                        {/* Condiciones de pago */}

                                        <div>

                                            <label
                                                htmlFor="condicionesPago"
                                                className="block text-sm font-medium text-[#3E4234] mb-2"
                                            >
                                                Condiciones de pago
                                            </label>

                                            <input
                                                id="condicionesPago"
                                                type="text"
                                                placeholder="Ej. Contado"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>

                                    </div>

                                </section>


                                {/* =================================================
                                    2. EMISOR
                                ================================================== */}

                                <section className="mb-10">

                                    <div className="mb-5">

                                        <h3 className="text-lg font-semibold text-[#3E4234]">
                                            2. Datos del emisor
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Información fiscal de eNova Home.
                                        </p>

                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                        {/* RFC */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                RFC
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="RFC del emisor"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Nombre / razón social */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Nombre / razón social
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Nombre o razón social"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Régimen fiscal */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Régimen fiscal
                                            </label>

                                            <select
                                                defaultValue=""
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    bg-white
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            >

                                                <option value="" disabled>
                                                    Seleccione
                                                </option>

                                                <option value="601">
                                                    601 - General de Ley Personas Morales
                                                </option>

                                                <option value="603">
                                                    603 - Personas Morales con Fines no Lucrativos
                                                </option>

                                                <option value="612">
                                                    612 - Personas Físicas con Actividades Empresariales
                                                </option>

                                                <option value="626">
                                                    626 - Régimen Simplificado de Confianza
                                                </option>

                                            </select>

                                        </div>


                                        {/* Código postal */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Código postal fiscal
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Código postal"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>

                                    </div>

                                </section>


                                {/* =================================================
                                    3. RECEPTOR
                                ================================================== */}

                                <section className="mb-10">

                                    <div className="mb-5">

                                        <h3 className="text-lg font-semibold text-[#3E4234]">
                                            3. Datos del receptor
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Información fiscal del cliente.
                                        </p>

                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                        {/* RFC */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                RFC
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="RFC del receptor"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Nombre / razón social */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Nombre / razón social
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Nombre o razón social"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Código postal */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Código postal
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Código postal fiscal"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Régimen fiscal */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Régimen fiscal
                                            </label>

                                            <select
                                                defaultValue=""
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    bg-white
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            >

                                                <option value="" disabled>
                                                    Seleccione
                                                </option>

                                                <option value="601">
                                                    601 - General de Ley Personas Morales
                                                </option>

                                                <option value="612">
                                                    612 - Personas Físicas con Actividades Empresariales
                                                </option>

                                                <option value="626">
                                                    626 - Régimen Simplificado de Confianza
                                                </option>

                                            </select>

                                        </div>


                                        {/* Uso CFDI */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Uso de CFDI
                                            </label>

                                            <select
                                                defaultValue=""
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    bg-white
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            >

                                                <option value="" disabled>
                                                    Seleccione
                                                </option>

                                                <option value="G01">
                                                    G01 - Adquisición de mercancías
                                                </option>

                                                <option value="G02">
                                                    G02 - Devoluciones, descuentos o bonificaciones
                                                </option>

                                                <option value="G03">
                                                    G03 - Gastos en general
                                                </option>

                                                <option value="S01">
                                                    S01 - Sin efectos fiscales
                                                </option>

                                            </select>

                                        </div>


                                        {/* Correo */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Correo electrónico
                                            </label>

                                            <input
                                                type="email"
                                                placeholder="correo@ejemplo.com"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>

                                    </div>

                                </section>


                                {/* =================================================
                                    4. DOMICILIO FISCAL
                                ================================================== */}

                                <section className="mb-10">

                                    <div className="mb-5">

                                        <h3 className="text-lg font-semibold text-[#3E4234]">
                                            4. Domicilio fiscal
                                        </h3>

                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                        {/* Calle */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Calle
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Calle"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Número exterior */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Número exterior
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Número exterior"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Número interior */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Número interior
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Número interior"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Colonia */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Colonia
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Colonia"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Municipio */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Municipio / Alcaldía
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Municipio o alcaldía"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Estado */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Estado
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Estado"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* País */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                País
                                            </label>

                                            <input
                                                type="text"
                                                defaultValue="México"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>

                                    </div>

                                </section>


                                {/* =================================================
                                    5. CONCEPTOS
                                ================================================== */}

                                <section className="mb-10">

                                    <div className="mb-5">

                                        <h3 className="text-lg font-semibold text-[#3E4234]">
                                            5. Conceptos
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Productos o servicios incluidos en la factura.
                                        </p>

                                    </div>


                                    <div className="overflow-x-auto">

                                        <table className="w-full text-sm">

                                            <thead>

                                                <tr className="border-b border-[#D6D6CF]">

                                                    <th className="text-left px-3 py-3 font-semibold text-[#3E4234]">
                                                        Clave SAT
                                                    </th>

                                                    <th className="text-left px-3 py-3 font-semibold text-[#3E4234]">
                                                        Producto / servicio
                                                    </th>

                                                    <th className="text-left px-3 py-3 font-semibold text-[#3E4234]">
                                                        Cantidad
                                                    </th>

                                                    <th className="text-left px-3 py-3 font-semibold text-[#3E4234]">
                                                        Unidad
                                                    </th>

                                                    <th className="text-left px-3 py-3 font-semibold text-[#3E4234]">
                                                        Precio unitario
                                                    </th>

                                                    <th className="text-left px-3 py-3 font-semibold text-[#3E4234]">
                                                        Descuento
                                                    </th>

                                                    <th className="text-left px-3 py-3 font-semibold text-[#3E4234]">
                                                        Importe
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                <tr>

                                                    <td className="px-3 py-4">

                                                        <input
                                                            type="text"
                                                            placeholder="Clave"
                                                            className="
                                                                w-full
                                                                px-4
                                                                py-2.5
                                                                border
                                                                border-[#D6D6CF]
                                                                rounded
                                                                text-sm
                                                                text-gray-700
                                                                focus:outline-none
                                                                focus:ring-2
                                                                focus:ring-[#6B705C]
                                                                focus:border-[#6B705C]
                                                            "
                                                        />

                                                    </td>


                                                    <td className="px-3 py-4">

                                                        <input
                                                            type="text"
                                                            placeholder="Descripción"
                                                            className="
                                                                w-full
                                                                px-4
                                                                py-2.5
                                                                border
                                                                border-[#D6D6CF]
                                                                rounded
                                                                text-sm
                                                                text-gray-700
                                                                focus:outline-none
                                                                focus:ring-2
                                                                focus:ring-[#6B705C]
                                                                focus:border-[#6B705C]
                                                            "
                                                        />

                                                    </td>


                                                    <td className="px-3 py-4">

                                                        <input
                                                            type="number"
                                                            placeholder="1"
                                                            className="
                                                                w-full
                                                                px-4
                                                                py-2.5
                                                                border
                                                                border-[#D6D6CF]
                                                                rounded
                                                                text-sm
                                                                text-gray-700
                                                                focus:outline-none
                                                                focus:ring-2
                                                                focus:ring-[#6B705C]
                                                                focus:border-[#6B705C]
                                                            "
                                                        />

                                                    </td>


                                                    <td className="px-3 py-4">

                                                        <input
                                                            type="text"
                                                            placeholder="H87"
                                                            className="
                                                                w-full
                                                                px-4
                                                                py-2.5
                                                                border
                                                                border-[#D6D6CF]
                                                                rounded
                                                                text-sm
                                                                text-gray-700
                                                                focus:outline-none
                                                                focus:ring-2
                                                                focus:ring-[#6B705C]
                                                                focus:border-[#6B705C]
                                                            "
                                                        />

                                                    </td>


                                                    <td className="px-3 py-4">

                                                        <input
                                                            type="number"
                                                            placeholder="0.00"
                                                            className="
                                                                w-full
                                                                px-4
                                                                py-2.5
                                                                border
                                                                border-[#D6D6CF]
                                                                rounded
                                                                text-sm
                                                                text-gray-700
                                                                focus:outline-none
                                                                focus:ring-2
                                                                focus:ring-[#6B705C]
                                                                focus:border-[#6B705C]
                                                            "
                                                        />

                                                    </td>


                                                    <td className="px-3 py-4">

                                                        <input
                                                            type="number"
                                                            placeholder="0.00"
                                                            className="
                                                                w-full
                                                                px-4
                                                                py-2.5
                                                                border
                                                                border-[#D6D6CF]
                                                                rounded
                                                                text-sm
                                                                text-gray-700
                                                                focus:outline-none
                                                                focus:ring-2
                                                                focus:ring-[#6B705C]
                                                                focus:border-[#6B705C]
                                                            "
                                                        />

                                                    </td>


                                                    <td className="px-3 py-4">

                                                        <input
                                                            type="number"
                                                            placeholder="0.00"
                                                            className="
                                                                w-full
                                                                px-4
                                                                py-2.5
                                                                border
                                                                border-[#D6D6CF]
                                                                rounded
                                                                text-sm
                                                                text-gray-700
                                                                focus:outline-none
                                                                focus:ring-2
                                                                focus:ring-[#6B705C]
                                                                focus:border-[#6B705C]
                                                            "
                                                        />

                                                    </td>

                                                </tr>

                                            </tbody>

                                        </table>

                                    </div>


                                    <div className="mt-4">

                                        <button
                                            type="button"
                                            className="
                                                px-4
                                                py-2
                                                text-sm
                                                font-medium
                                                rounded
                                                bg-[#6B705C]
                                                text-white
                                                hover:bg-[#5B604E]
                                                transition-colors
                                            "
                                        >
                                            + Agregar concepto
                                        </button>

                                    </div>

                                </section>


                                {/* =================================================
                                    6. IMPUESTOS
                                ================================================== */}

                                <section className="mb-10">

                                    <div className="mb-5">

                                        <h3 className="text-lg font-semibold text-[#3E4234]">
                                            6. Impuestos
                                        </h3>

                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


                                        {/* Impuesto */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Impuesto
                                            </label>

                                            <select
                                                defaultValue=""
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    bg-white
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            >

                                                <option value="" disabled>
                                                    Seleccione
                                                </option>

                                                <option value="002">
                                                    IVA
                                                </option>

                                                <option value="001">
                                                    ISR
                                                </option>

                                                <option value="003">
                                                    IEPS
                                                </option>

                                            </select>

                                        </div>


                                        {/* Tipo factor */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Tipo factor
                                            </label>

                                            <select
                                                defaultValue="Tasa"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    bg-white
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            >

                                                <option value="Tasa">
                                                    Tasa
                                                </option>

                                                <option value="Cuota">
                                                    Cuota
                                                </option>

                                                <option value="Exento">
                                                    Exento
                                                </option>

                                            </select>

                                        </div>


                                        {/* Tasa */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Tasa / cuota
                                            </label>

                                            <input
                                                type="number"
                                                step="0.000001"
                                                placeholder="0.160000"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>


                                        {/* Importe */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Importe
                                            </label>

                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>

                                    </div>

                                </section>


                                {/* =================================================
                                    7. INFORMACIÓN DE PAGO
                                ================================================== */}

                                <section className="mb-10">

                                    <div className="mb-5">

                                        <h3 className="text-lg font-semibold text-[#3E4234]">
                                            7. Información de pago
                                        </h3>

                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                                        {/* Forma de pago */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Forma de pago
                                            </label>

                                            <select
                                                defaultValue=""
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    bg-white
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            >

                                                <option value="" disabled>
                                                    Seleccione
                                                </option>

                                                <option value="01">
                                                    01 - Efectivo
                                                </option>

                                                <option value="02">
                                                    02 - Cheque nominativo
                                                </option>

                                                <option value="03">
                                                    03 - Transferencia electrónica
                                                </option>

                                                <option value="04">
                                                    04 - Tarjeta de crédito
                                                </option>

                                                <option value="28">
                                                    28 - Tarjeta de débito
                                                </option>

                                                <option value="99">
                                                    99 - Por definir
                                                </option>

                                            </select>

                                        </div>


                                        {/* Método de pago */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Método de pago
                                            </label>

                                            <select
                                                defaultValue=""
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    bg-white
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            >

                                                <option value="" disabled>
                                                    Seleccione
                                                </option>

                                                <option value="PUE">
                                                    PUE - Pago en una sola exhibición
                                                </option>

                                                <option value="PPD">
                                                    PPD - Pago en parcialidades o diferido
                                                </option>

                                            </select>

                                        </div>


                                        {/* Parcialidades */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                                Número de parcialidades
                                            </label>

                                            <input
                                                type="number"
                                                placeholder="Opcional"
                                                className="
                                                    w-full
                                                    px-4
                                                    py-2.5
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    text-sm
                                                    text-gray-700
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    focus:border-[#6B705C]
                                                "
                                            />

                                        </div>

                                    </div>

                                </section>


                                {/* =================================================
                                    8. TOTALES
                                ================================================== */}

                                <section className="mb-8">

                                    <div className="mb-5">

                                        <h3 className="text-lg font-semibold text-[#3E4234]">
                                            8. Totales
                                        </h3>

                                    </div>


                                    <div className="max-w-md ml-auto">

                                        <div className="space-y-3">

                                            <div className="flex justify-between text-sm">

                                                <span className="text-gray-600">
                                                    Subtotal
                                                </span>

                                                <span className="font-medium text-[#3E4234]">
                                                    $0.00
                                                </span>

                                            </div>


                                            <div className="flex justify-between text-sm">

                                                <span className="text-gray-600">
                                                    Descuento
                                                </span>

                                                <span className="font-medium text-[#3E4234]">
                                                    $0.00
                                                </span>

                                            </div>


                                            <div className="flex justify-between text-sm">

                                                <span className="text-gray-600">
                                                    IVA
                                                </span>

                                                <span className="font-medium text-[#3E4234]">
                                                    $0.00
                                                </span>

                                            </div>


                                            <div className="pt-3 border-t border-[#D6D6CF] flex justify-between">

                                                <span className="text-base font-semibold text-[#3E4234]">
                                                    Total
                                                </span>

                                                <span className="text-xl font-semibold text-[#3E4234]">
                                                    $0.00
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </section>


                                {/* =================================================
                                    BOTONES
                                ================================================== */}

                                <div
                                    className="
                                        mt-8
                                        pt-6
                                        border-t
                                        border-[#D6D6CF]
                                        flex
                                        flex-col-reverse
                                        sm:flex-row
                                        sm:justify-end
                                        gap-3
                                    "
                                >

                                    <button
                                        type="button"
                                        className="
                                            px-5
                                            py-2.5
                                            text-sm
                                            font-medium
                                            rounded
                                            border
                                            border-[#D6D6CF]
                                            text-[#3E4234]
                                            hover:bg-[#F1F1EF]
                                            transition-colors
                                        "
                                    >
                                        Cancelar
                                    </button>


                                    <button
                                        type="button"
                                        className="
                                            px-5
                                            py-2.5
                                            text-sm
                                            font-medium
                                            rounded
                                            bg-[#6B705C]
                                            text-white
                                            hover:bg-[#5B604E]
                                            transition-colors
                                        "
                                    >
                                        Guardar factura
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}