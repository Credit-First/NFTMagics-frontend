import * as React from 'react';
import { useRouter } from 'next/router';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useState } from 'react';
import { GiftSection } from './styles';
import { LoadingComponent } from '@/components/Loading';
import PageLoading from '@/components/PageLoading';

const { useReducer } = React
const TOGGLE_BOX = '[GiftBox] Toggle'
const toggleBox = () => {
  return { type: TOGGLE_BOX }
}
const DEFAULT = { open: false, wasOpen: false }
const reducer = (
  state = DEFAULT,
  { type }: { type: any }
) => {

  switch (type) {
    case TOGGLE_BOX: {
      return {
        open: !state.open,
        wasOpen: state.open
      }
    }
    default: return state
  }
}

const GiftBox = () => {
  const router = useRouter()
  const { address } = router.query;
  const [state, dispatch] = useReducer(reducer, DEFAULT);
  const [loading, setLoading] = useState(false);

  const handleLink = () => {
    setLoading(true);
    router.push(`/account/${address}/all`);
  }

  return (
    <>
      <GiftSection className="gift" >
        <div className="floor">
          <div className='shadow2'></div>
          <div className='shadow3'></div>
          <div className="box">
            {
              state.open
                ? (
                  <MailOutlineIcon className="icon_mail_alt heart-gift" onClick={handleLink} />
                )
                : <></>
            }
            <div
              className={
                state.open ? 'lid open'
                  : state.wasOpen ? 'lid close'
                    : 'lid'
              }
              onClick={() => dispatch(toggleBox())}>

              <div className="qmark">{
                state.open ? '' : '?'
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
            state.open ?
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