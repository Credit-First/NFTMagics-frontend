import * as React from 'react';
import { useRouter } from 'next/router';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useState } from 'react';
import { GiftSection } from './styles';
import PageLoading from '@/components/PageLoading';
import { actionGetGiftItems } from '@/store/actions';
import { selectGiftItems } from '@/store/selectors';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";

import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import AOS from "aos";
import "aos/dist/aos.css";

const GiftBox = () => {
  const router = useRouter()
  const { address } = router.query;
  const dispatch = useDispatch();
  const giftItems = useSelector(selectGiftItems);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(false);
  const { account } = useWeb3React();

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const handleLink = () => {
    setLoading(true);
    router.push({
      pathname: `/account/${address}/all`,
      query: { gift: true },
    })
  }
  const toggleBox = () => {
    setState(true);
    setOpen(!open);
  }
  React.useEffect(() => {
    dispatch(actionGetGiftItems({ account }));
    AOS.init({ once: true });
    AOS.refresh();
  }, [account]);

  React.useEffect(() => {
    if (!account) return notify('error', 'please connect your wallet');
  }, []);

  return (
    <>
      <GiftSection className="gift" >
        {
          giftItems.length > 0 && (
            <div className='gift-list' data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
              <div className='gift-count'>
                <div>you have received </div>
                <div className='count'>{giftItems.length}</div>
                <div>gifts</div>
              </div>
              <ul className='gift-name-list'>
                {
                  giftItems.map((item: any, key: any) => {
                    return (
                      <li key={key} className='gift-item'>
                        <div className='gift-name'>{item.name}</div>
                        <div>from:</div>
                        <div className='from-address'>{item.owner.substring(0, 12)} ... {item.owner.substring(item.owner.length - 8)}</div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        }
        <div className="floor">
          <div className='shadow2'></div>
          <div className='shadow3'></div>
          <div className="box">
            {
              open
                ? (
                  <MailOutlineIcon className="icon_mail_alt heart-gift" onClick={handleLink} />
                )
                : <></>
            }
            <div className={clsx('lid', open ? 'open' : (state ? 'close' : ''))} onClick={() => toggleBox()}>
              <div className="qmark">{
                open ? '' : '?'
              }
              </div>
              <div className="face ltop"></div>
              <div className="face lleft"></div>
              <div className="face lright"></div>
            </div>

            <div className="face top"></div>
            <div className="face left"></div>
            <div className="face right"></div>
          </div>
        </div>
        <h2 className='gift-font' style={{ position: "absolute" }}>
          {
            open ?
              <>
                <span>S</span><span>u</span><span>r</span><span>p</span><span>r</span><span>i</span><span>s</span><span>e</span>
              </>
              :
              <>
                <span>Click</span> <span>to</span> <span>open!</span>
              </>
          }
        </h2>
      </GiftSection>
      <PageLoading loading={loading ? 1 : 0} />
    </>
  )
}

export default GiftBox