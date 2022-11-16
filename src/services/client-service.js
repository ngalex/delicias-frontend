import { supabase } from "../supabase/supabase";

export const getClienteByNameOrDni = async (patron) => {
    const { error, data } = await supabase
        .from("clientes")
        .select()
        .or(`dni.eq.${patron},nombre.ilike.%${patron}%`)
        .single();
    if (error) throw error;
    return data;
};