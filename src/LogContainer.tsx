import { useState } from "react";

export const LogContainer = (props: { logs: string[] }): JSX.Element => (
    <div className="log-container">
        <div className="log-container-inner">
        {props.logs.map((log, i) => <LogLine
            key={i}
            logLine={log}
        />)}
        </div>
    </div>
);

const LogLine = (props: {
    logLine: string;
    className?: string | undefined;
}) => {
    const [selected, setSelected] = useState(false);

    return (
        <div
            className={`linecontainer ${selected ? " selected" : ""} ${props.className
                }`}
            onClick={() => setSelected((prev) => !prev)}
        >
            <code className="logline">{props.logLine}</code>
        </div>
    );
};
