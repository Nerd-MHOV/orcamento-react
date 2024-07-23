import { useState } from "react";

const useStaff = () => {
    const [staff, setStaff] = useState(false);

    function toggleStaff() {
        setStaff(!staff);
    }

    return {
        staff,
        toggleStaff,
    }
}

export default useStaff