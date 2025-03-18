import Dialogue from "../../../components/Dialogue/Dialogue";

import { Trans } from "@lingui/react/macro";

export default function DamagedVeteranModal({ show, setShow }: { show: boolean, setShow: (show: boolean) => void }) {
    return (
        <Dialogue
            title="Damaged Veteran"
            show={show}
            setShow={setShow}
        >
            <Trans>Click around or whatver</Trans>
        </Dialogue>
    );
}   