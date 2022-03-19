
import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Edit from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Skeleton
} from '@mui/material';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import { LoadingComponent } from '@/components/Loading';
import { useWeb3React } from "@web3-react/core";

const IMG_HEIGHT = 220;

const EmptyCard = styled('div')(({ theme, width, height }: { theme?: any, width: any, height: any }) => {
    return ({
        display: 'flex',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        margin: '10px 10px',
        flexDirection: 'column',
        zIndex: 2,
        maxWidth: '550px',
    })
});

const CardDiv = styled('div')(({ theme, width, height }: { theme?: any, width: any, height: any }) => {

    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:900px)');

    return ({
        '& .card-image-card': {
            position: 'relative',
            display: 'flex',
            width: width,
            textAlign: "center",
            margin: '10px 10px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            maxWidth: '550px',
            transition: 'all 0.3s',
            // border: '1px solid rgba(0, 0, 0, 0.15)',
            boxSizing: 'content-box',
            boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 10px 0px',
            background: `${theme.palette.background.default}`,
            ...((sm || md) && {
                maxWidth: '355px',
            }),
            '& .card-edit': {
                zIndex: 1,
                position: 'absolute',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
                right: 10,
                width: 40,
                height: 40,
                borderRadius: 5,
                background: '#ffffffa1',
                color: 'grey',
                boxShadow: '0px 0px 5px 0px grey'
            },
            '& .card-image-card-link': {
                borderRadius: 10,
                color: 'rgb(32, 129, 226)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                '& .card-image-card-link-meida': {
                    height: IMG_HEIGHT,
                    borderBottom: '1px solid background.default',
                    minHeight: 'inherit',
                    borderRadius: 'inherit',
                    '& .media-img': {
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        display: 'flex',
                        height: '100%',
                        minHeight: 'inherit',
                        width: '100%',
                        position: 'relative',
                        borderRadius: 'inherit',
                        '& .asset-media-image': {
                            height: IMG_HEIGHT,
                            width: width,
                            borderRadius: 'inherit',
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            maxHeight: '100%',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            '& img': {
                                objectFit: 'fill',
                                width: '100%',
                                height: '100%',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderTopLeftRadius: 'inherit',
                                borderTopRightRadius: 'inherit',
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 0,
                            }
                        }
                    }
                }
            },
            '& .logo': {
                position: 'relative',
                width: 60,
                height: 60,
                border: `2px solid white`,
                borderRadius: '50%',
                marginTop: '-30px',
                boxShadow: `rgb(14 14 14 / 60%) 0px 0px 2px 0px`,
                '& span': {
                    borderRadius: '100%',
                }
            },
            '& .card-image-text-area': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: `${theme.palette.text.primary}`,
                padding: 20,
                width: '100%',
                height: 150,
                marginBottom: 10,
                '& .name': {
                    fontWeight: 500,
                    fontSize: 20,
                    display: '-webkit-box',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'break-spaces',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                },
                '& .owner': {
                    padding: 10,
                    fontSize: 13,
                    color: `${theme.palette.text.primary}`,
                    opacity: 0.7
                },
                '& .description': {
                    fontWeight: 400,
                    fontSize: 15,
                    display: '-webkit-box',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'break-spaces',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }
            },
            '&:hover': {
                cursor: 'pointer',
                transform: 'translateY(-4px)',
                boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 10px 0px',
                '& .card-edit': {
                    display: 'flex',
                }
            }
        }
    })
})

const CollectionCard = ({ item, empty, width, height }: { item: any, empty: any, width: any, height: any }) => {
    const router = useRouter();
    const { account }: any = useWeb3React();

    const [collection, setCollectioin] = React.useState({
        banner: '',
        createdAt: '',
        description: '',
        featured: '',
        itemId: 2,
        logo: '',
        name: '',
        owner: '',
        count: 0,
        updatedAt: ''
    });

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    if (empty) {
        return (
            <EmptyCard width={width} height={height}>
                {/* <LoadingComponent /> */}
            </EmptyCard>
        );
    }

    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }
    const handleLink = (path?: any) => (event: any) => {
        router.push(`/marketplace/collection/${item.itemId}/get`);
    }
    const handleEdit = () => {
        if (!account) return notify('error', 'please connect your wallet');
        router.push(`/marketplace/collection/${item.itemId}/edit`);
    }
    React.useEffect(() => {
        if (item) {
            setCollectioin(collection => ({ ...collection, banner: item.banner }));
            setCollectioin(collection => ({ ...collection, featured: item.featured }));
            setCollectioin(collection => ({ ...collection, logo: item.logo }));
            setCollectioin(collection => ({ ...collection, name: item.name }));
            setCollectioin(collection => ({ ...collection, description: item.description }));
            setCollectioin(collection => ({ ...collection, itemId: item.itemId }));
            setCollectioin(collection => ({ ...collection, owner: item.owner }));
            setCollectioin(collection => ({ ...collection, count: item.count }));
            setCollectioin(collection => ({ ...collection, createdAt: item.createdAt }));
            setCollectioin(collection => ({ ...collection, updatedAt: item.updatedAt }));
        }

    }, [item]);

    return (
        <>
            {
                item ? (
                    <CardDiv height={height} width={width}>
                        <article className='card-image-card'>
                            <div className='card-edit' onClick={handleEdit}>
                                <Edit />
                            </div>
                            <a className='card-image-card-link' onClick={handleLink()}>
                                <div className='card-image-card-link-meida'>
                                    <div className='media-img'>
                                        {collection.featured && (
                                            <div className='asset-media-image'>
                                                <Skeleton className='' sx={{ height: '100%', width: '100%', borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} animation="wave" variant="rectangular" />
                                                {collection.featured && (<Image loader={imgLoader} src={collection.featured} layout="fill" objectFit="fill" />)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='logo'>
                                    {collection.logo && (<Image loader={imgLoader} src={collection.logo} layout="fill" objectFit="fill" />)}
                                </div>
                                <div className='card-image-text-area'>
                                    <div className='name'>{collection.name || <Skeleton variant="text" />}</div>
                                    <div className='owner'>{('by ' + collection.owner.toString().substring(0, 15) + '...' + item.owner.toString().substring(item.owner.length - 8)) || <Skeleton variant="text" />}</div>
                                    <div className='description'>{collection.description || <Skeleton variant="text" />}</div>
                                </div>
                            </a>
                        </article>
                    </CardDiv>
                ) : (
                    <EmptyCard height={height} width={width} >
                        <LoadingComponent />
                    </EmptyCard>
                )
            }
        </>
    )
}

export default CollectionCard;