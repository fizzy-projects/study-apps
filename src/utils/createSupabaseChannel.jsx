import supabase from "../admin/supabase-client";

export default function createSupabaseChannel({channelName="app-realtime",handlers = []}) {
        const channel = supabase.channel(channelName);
        handlers.forEach(({ table, setState }) => {
            console.log(`table: ${table}`);
            channel.on(
                "postgres_changes",
                { event: "*", schema: "public", table },
                (payload) => {
                    console.log("Realtime event:", payload);
                    setState(
                        (current) => {
                            switch (payload.eventType) {
                            case "INSERT":
                                return [...current, payload.new]; // add new row
                            case "UPDATE":
                                return current.map((w) =>
                                w.id === payload.new.id ? payload.new : w
                                ); // replace updated row
                            case "DELETE":
                                return current.filter((w) => w.id !== payload.old.id); // remove deleted row
                            default:
                                return current;
                            }
                        }
                    );

                    // if (payload.eventType === "INSERT" && setState) {
                    //     setState(payload.new);
                    // }
                    // if (payload.eventType === "UPDATE" && setState) {
                    //     setState(payload.new, payload.old);
                    // }
                    // if (payload.eventType === "DELETE" && setState) {
                    //     setState(payload.old);
                    // }
                }
            );
    });

//     channel.subscribe();

//     return () => {
//         supabase.removeChannel(channel);
//     };
//   }, []);
    return channel;
};
