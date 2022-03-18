import * as React from 'react';
import {
    useTheme,
} from '@mui/material';
import useWindowSize from "@/hooks/useWindowSize";
import PhotoProvider from "@/providers/photoProvider"
import { UIEvent, PhotoEditorSDKUI, ImageFormat, ExportFormat, EditorApi } from "photoeditorsdk";

const CreateCustom = ({ setImage, handleNext }: { setImage: any, handleNext: any }) => {
    const theme = useTheme();
    const windowSize = useWindowSize();

    type ThreeTypes = boolean | null;

    const [editor, setEditor] = React.useState<EditorApi>();
    const [isMobile, setMobile] = React.useState<ThreeTypes>(null)

    const load = React.useCallback(() => {
        PhotoEditorSDKUI.init({
            library: {
                provider: PhotoProvider,
                enableUpload: !0
            },
            layout: (isMobile ? 'basic' : 'advanced'),
            theme: theme.palette.mode,
            container: "#editor",
            assetBaseUrl: "./assets",
            image: "./example.jpg",
            export: {
                image: {
                    enableDownload: false,
                    format: ImageFormat.PNG,
                    exportType: ExportFormat.DATA_URL,
                },
            },
            custom: {
                languages: {
                    en: {
                        mainCanvasActions: {
                            buttonExport: 'Save Image',
                        },
                    },
                },
                components: {
                },
            },
            license: '',
        }).then(editor => {
            setEditor(editor);
            editor.on(UIEvent.CLOSE, () => {
            });
            editor.on(UIEvent.EXPORT, (imageSrc) => {
                setImage(imageSrc)
                handleNext();
            });
        })
    }, [isMobile, theme.palette.mode]);

    React.useEffect(() => {
        if (windowSize[0] > 0) {
            setMobile(windowSize[0] <= 900);
        }
    }, [windowSize])

    React.useEffect(() => {
        if (isMobile !== null) {
            if (editor) editor.close();
            setTimeout(() => {
                load();
            }, 100)
        }
    }, [theme.palette.mode, isMobile])

    return (
        <div className="" id="content">
            <div className="" style={{ position: "relative" }}>
                <div className="">
                    <div>
                        <div
                            id="editor"
                            style={{ width: 'calc(100vw - 17px)', height: '100vh' }}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateCustom;