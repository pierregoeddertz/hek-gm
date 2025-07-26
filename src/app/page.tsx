'use client';

import { useState, useRef, useEffect } from 'react';
import Unit from '../components/Unit';
import Promoter from '../components/Promoter';
import Director from '../components/Director';

import { supabase } from '../lib/supabase';
import Arm from '../components/Arm/Arm';
import Accordion from '../components/Accordion';
import Dragger from '../components/Dragger';
import Scroller from '../components/Scroller/Scroller';
import Marquee from 'react-fast-marquee';

export default function Home() {
  const accordionData = [
    {
      title: "HEK Gebäudemanagement GmbH",
      subtitle: "Innovation mit Tradition: Ihre Experten für zukunftsweisende Gebäude- & Klimatechnik",
      openLabel: "Mehr anzeigen",
      closeLabel: "Zurück",
      content: (
        <div>
          <p>HEK steht seit über 40 Jahren als Garant für Sicherheit und Zuverlässigkeit in der Beratung, Planung, Installation und Wartung von moderner technischer Gebäudeausrüstung. Innovativ, vielseitig und umweltorientiert bietet HEK maßgeschneiderte Lösungen, Planung, Montage, Instandhaltung und Wartung aus den Gewerken Heizung, Elektro, Kälte, Klima, Lüftung und Sanitär an. Kurz: Die komplette Haustechnik aus einer Hand- das ist HEK.<br /><br />
          Selbstverständlich ist HEK auch Mitglied der Handwerkskammern, erfolgreicher Ausbildungsbetrieb und autorisierter Kundendienstbetrieb vieler namhafter Marktanbieter<br /><br />
          Nutzen Sie unsere jahrzehntelange Branchenerfahrung als Fundament für Ihr Bauprojekt!</p>
        </div>
      ),
    },
    {
      title: "Referenzen",
      subtitle: "Mit mehr als 28 Jahren Branchenerfahrung kann die HEK Gebäudemanagement GmbH nicht nur auf eine umfangreiche Expertise, sondern auch auf zahlreiche Referenzen zurückgreifen.",
      openLabel: "Mehr anzeigen",
      closeLabel: "Zurück",
      content: (
        <div>
          <p>Die Entwicklung von anspruchsvollen Sonderlösungen bestimmt unseren Alltag. Setzen Sie mit der HEK auf ein stabiles Fundament für Ihr Bauvorhaben und lassen Sie sich von unseren zufriedenen Kunden überzeugen.</p>
        </div>
      )
    },
    {
      title: "Partner & Sponsoring",
      subtitle: "Gemeinsam mehr erreichen: Partner, die unsere Visionen teilen",
      openLabel: "Mehr anzeigen",
      closeLabel: "Zurück",
      content: (
        <div>
          <p>Gemeinsam stark: Die HEK Gebäudemanagement GmbH kooperiert mit ausgewählten Partnern, die unseren strikten Qualitätsstandard entsprechen, Innovationen fördern sowie im Alltag integrieren und unsere Visionen teilen. Gemeinsam gestalten wir die Zukunft der Gebäude- und Energietechnik für unsere Kunden.</p>
        </div>
      )
    }
  ];
  const [openStates, setOpenStates] = useState<boolean[]>([false, false, false]);
  const [hekIds, setHekIds] = useState<string[]>([]);
  const armRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (armRef.current) {
      // Entferne alle Vorkommen von setArmHeight, da armHeight bereits entfernt wurde und setArmHeight nicht mehr existiert.
    }

    // Lade die ersten 3 HEK-Artikel einmalig
    (async () => {
      const { data, error } = await supabase
        .from('hek')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(3);
      
      console.log('HEK Data loaded:', data, 'Error:', error);
      
      if (!error && data) {
        setHekIds((data as { id: string }[]).map(d => d.id));
      }
    })();

    const handleResize = () => {
      if (armRef.current) {
        // Entferne alle Vorkommen von setArmHeight, da armHeight bereits entfernt wurde und setArmHeight nicht mehr existiert.
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <h1 className="visually-hidden">HEK</h1>

      {/* Promoter ganz oben */}
      <Unit first={{ colorDom: true }}>
        <Promoter tableName={["news", "smartflower", "hek"]} filterMode="promoted" />
      </Unit>

      <Unit second={{ spacingT: true, spacingB: true, widthMax: 1 }}>
        <Accordion
          title={accordionData[0].title}
          subtitle={accordionData[0].subtitle}
          open={openStates[0]}
          onClick={() => setOpenStates(states => {
            const copy = [...states];
            copy[0] = !copy[0];
            return copy;
          })}
        >
          {accordionData[0].content}
        </Accordion>
      </Unit>
      {/* Explorer/Arm-Demo */}
      <Unit second={{ style: { paddingTop: '2.5em', paddingBottom: '10rem', paddingLeft: '0', paddingRight: '0' } }}>
        <Dragger style={{ paddingLeft: 'calc((100vw - 296px) / 2)', paddingRight: 'calc((100vw - 306px) / 2)' }}>
          {hekIds.length >= 3 && (
            <Director direction="h 3 1">
              {/* Heizung */}
              <Director direction="v 1 1" style={{ gap: '2.5rem' }} >
                <div style={{ height: '30px', width: '100%' }} />
                <svg viewBox="0 0 322 381" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--max_3)', marginRight: '60px' }}>
                  <path d="M0.607178 51.6413V380.625H85.6488V148.646V0.625L0.607178 51.6413Z" fill="var(--clrL_b)" />
                  <path d="M235.823 148.646H85.6488L138.746 222.375H235.823V380.625L321.399 329.276V0.625H235.823V148.646Z" fill="var(--clrL_b)" />
                </svg>
                <div style={{ height: '30px', width: '100%' }}>
                  <Arm
                    ref={armRef}
                    side="right"
                    staticLabel="Heizung"
                    {...(hekIds[0] ? { href: `/heizung` } : { disabled: true })}
                    style={{ width: '140%', marginLeft: '-60px' }}
                  />
                </div>
              </Director>
              <span style={{ width: '2.5rem', display: 'inline-block' }} />
              {/* Elektrik */}
              <Director direction="v 1 1"  style={{ gap: '2.5rem' }} >
                <div style={{ height: '30px', width: '100%' }}>
                  <Arm
                    direction="down"
                    staticLabel="Elektronik"
                    {...(hekIds[1] ? { href: `/elektronik` } : { disabled: true })}
                    style={{ width: '140%' }}
                  />
                </div>
                <svg viewBox="0 0 275 381" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--max_3)', marginRight: '30px' }}>
                  <path d="M254.99 222.375V150.799H85.4408L136.992 222.375H254.99Z" fill="var(--clrL_b)" />
                  <path d="M85.4408 150.799V73.8192H271.143V0.625H53.1059L0.39917 73.8192V380.625H221.658L274.364 307.416H85.4408V150.799Z" fill="var(--clrL_b)" />
                </svg>
                <div style={{ height: '30px', width: '100%' }} />
              </Director>
              <span style={{ width: '2.5rem', display: 'inline-block' }} />
              {/* Klima */}
              <Director direction="v 1 1"  style={{ gap: '2.5rem' }} >
                <div style={{ height: '30px', width: '100%' }} />
                <svg viewBox="0 0 333 381" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--max_3)'}}>
                  <path d="M190.4 208.591H89.7402L85.4203 208.62L227.705 380.625H332.714L190.4 208.591Z" fill="var(--clrL_b)" />
                  <path d="M316.576 0.625H213.589L85.4202 120.4V0.625H0.364014V380.625H85.4202L85.4203 208.62L316.576 0.625Z" fill="var(--clrL_b)" />
                </svg>
                <div style={{ height: '30px', width: '100%' }} >
                  <Arm
                    side="left"
                    staticLabel="Klima"
                    {...(hekIds[2] ? { href: `/klima` } : { disabled: true })}
                    style={{ width: '140%' }}
                  />
                </div>
              </Director>
            </Director>
          )}
        </Dragger>
      </Unit>
      <Unit second={{ spacingT: true, spacingB: true, style: { padding: '0' } }}>
        <Scroller accordionData={[accordionData[1]]} />
      </Unit>
      <Unit second={{ spacingT: true, spacingB: true, widthMax: 1 }}>
        <Accordion
          title={accordionData[2].title}
          subtitle={accordionData[2].subtitle}
          open={openStates[2]}
          onClick={() => setOpenStates(states => {
            const copy = [...states];
            copy[2] = !copy[2];
            return copy;
          })}
        >
          {accordionData[2].content}
        </Accordion>
      </Unit>

      {/* Marquee am Ende */}
      <Unit second={{ spacingT: true, spacingB: true, style: { overflow: 'hidden' } }}>
        <Marquee 
          speed={50}
          style={{ color: 'var(--clrA_z)' }}
          autoFill={true}
          gradient={false}
        >
          <svg width="114" height="20" viewBox="0 0 114 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: 'auto', color: 'var(--clrA_z)', marginRight: '2rem' }}>
            <path d="M8.4779 20.1953C4.12219 19.5167 0.786375 16.1945 0.0856507 11.8377C-0.0883966 10.7582 0.0136507 8.70027 0.293714 7.63558C0.581147 6.54084 1.30852 5.04471 1.9979 4.13026C4.60918 0.664617 9.44225 -0.70395 13.5854 0.847169C14.3904 1.14934 15.4846 1.76786 16.026 2.22821L16.3514 2.50487L15.8633 3.37454C15.6308 3.78857 15.3967 4.20168 15.1609 4.61385L14.9477 4.98405L14.408 4.54355C13.7657 4.01857 12.5394 3.40685 11.6952 3.19029C10.7689 2.95218 9.03916 2.97145 8.13718 3.22884C5.62568 3.946 3.82512 5.80383 3.21283 8.31079C2.21844 12.3859 4.38751 16.2807 8.21712 17.2949C9.14518 17.541 10.9474 17.5228 11.8642 17.2592C12.7338 17.0086 13.726 16.4955 14.4176 15.9383L14.9534 15.5063L15.0753 15.7007C15.1422 15.8073 15.4562 16.364 15.7737 16.9383L16.3509 17.9815L15.988 18.3001C15.5492 18.6839 14.5378 19.2724 13.8133 19.5655C12.7049 20.0133 11.6969 20.2078 10.304 20.2435C9.58625 20.2622 8.76477 20.2401 8.4779 20.1953ZM27.5199 20.188C26.1173 20.0122 24.4007 19.3489 23.1024 18.4809C21.0779 17.126 19.4599 14.6031 19.0063 12.0911L18.9474 11.7651H21.9918L22.0842 12.1347C22.8513 15.1961 25.2964 17.2501 28.4406 17.4746C30.2984 17.6067 32.2889 16.9162 33.6632 15.6627C34.5085 14.8917 35.2971 13.5764 35.6367 12.3723L35.7954 11.8082L37.2875 11.7844C39.0195 11.7572 38.8976 11.663 38.6068 12.8048C37.3584 17.694 32.6512 20.8292 27.5199 20.188ZM81.385 19.5133C79.8106 19.1647 78.8565 18.6476 77.7742 17.5563C77.1535 16.9298 76.9125 16.6101 76.62 16.0256C75.769 14.3242 75.7174 13.7669 75.7503 6.63495L75.7764 1.02689L78.7766 0.979263V7.09303C78.7766 12.2974 78.7964 13.2839 78.9092 13.725C79.4246 15.7296 80.9247 16.8266 83.1669 16.838C85.3847 16.8493 86.8394 15.822 87.4585 13.8089C87.5719 13.4387 87.5963 12.4448 87.6229 7.17807L87.6535 0.983232H90.6016V7.05845C90.6016 13.6445 90.5812 13.9897 90.1197 15.2194C89.3192 17.351 87.6966 18.8007 85.417 19.4203C84.4198 19.6925 82.4032 19.7384 81.385 19.5133ZM43.2573 1.02632L46.6918 1.02689C50.573 1.02802 50.8944 1.06657 52.1388 1.66978C53.4841 2.32175 54.3759 3.31955 54.8283 4.67791C55.1214 5.55778 55.1606 6.89744 54.9168 7.71665C54.461 9.24906 53.555 10.2984 52.0674 11.0173L51.3134 11.3813L54.2195 15.4048C55.8182 17.6175 57.1255 19.4453 57.1255 19.4657C57.1255 19.4861 56.3284 19.5031 55.3544 19.5031H53.5839L47.9781 11.5905H46.2569V19.5037H43.2125L43.2573 1.02632ZM50.6047 8.71388C51.1144 8.47463 51.5753 8.06928 51.7737 7.6866C52.1604 6.93826 52.1116 5.70745 51.666 4.98235C51.0923 4.04918 50.1965 3.76572 47.8268 3.76572H46.2575V8.99678L48.1919 8.96843C50.0605 8.94008 50.1427 8.93158 50.6053 8.71445L50.6047 8.71388ZM60.6904 0.983232H71.559V3.9392H63.6441L63.69 8.67873L69.9943 8.72408V11.591H63.6464V16.5471H71.559V19.5037H60.6904V0.983232ZM95.4698 0.855672L95.7657 1.15841C95.9284 1.32509 97.9467 3.47659 100.252 5.93933C102.556 8.40207 104.47 10.4277 104.505 10.4407C104.54 10.4538 106.577 8.32156 109.032 5.70235C111.488 3.08314 113.529 0.926539 113.57 0.910665C113.609 0.894791 113.643 5.07193 113.643 10.1924V19.5037H110.601L110.555 8.16906L107.564 11.4045C105.919 13.1835 104.543 14.6287 104.507 14.615C104.471 14.602 103.122 13.1626 101.51 11.4176C99.8975 9.67142 98.5448 8.23029 98.5023 8.21441C98.4592 8.19797 98.4263 10.6414 98.4263 13.844V19.5037H95.4698V0.855672ZM28.3023 11.8955C27.6412 11.6619 27.127 10.8977 27.131 10.1567C27.1338 9.56144 27.6503 8.85845 28.2779 8.59652C29.5535 8.06361 30.9311 9.28024 30.6029 10.6499C30.4169 11.4261 29.6476 12.0338 28.8675 12.0219C28.7479 12.0202 28.4933 11.9635 28.3023 11.8955ZM19.0421 8.21215C19.0421 7.98594 19.5069 6.57939 19.7779 5.98411C20.8744 3.57807 23.0582 1.59041 25.5073 0.768365C28.6572 -0.290658 32.0503 0.174791 34.7375 2.03262C35.4915 2.55363 36.6764 3.75608 37.2076 4.53731C37.7434 5.32648 38.3035 6.55331 38.5529 7.48534L38.7672 8.28641H35.669L35.6123 7.98197C35.517 7.47684 34.7341 6.01926 34.2312 5.41095C32.1285 2.87054 28.2365 2.23558 25.2828 3.95281C23.9188 4.74537 22.7316 6.2398 22.2549 7.76541L22.1052 8.24333L20.5739 8.26714C19.6929 8.28074 19.0421 8.25807 19.0421 8.21215Z" fill="currentColor"/>
          </svg>
          <svg width="241" height="20" viewBox="0 0 241 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: 'auto', color: 'var(--clrA_z)', marginRight: '2rem' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.05313 9.31426C12.2831 10.2444 14.2342 11.8054 14.2342 14.7611C14.2342 18.0737 11.5238 20.209 7.75493 20.209C4.74536 20.209 2.27788 19.1952 0 17.1426L0.392993 16.6734C0.887225 16.0824 1.75788 15.9635 2.37268 16.4262C3.99987 17.6518 5.6694 18.2651 7.83592 18.2651C10.3853 18.2651 12.0659 16.9234 12.0659 14.9804C12.0659 13.1732 11.117 12.1604 7.13093 11.312C2.76567 10.354 0.760215 8.9305 0.760215 5.75547C0.760215 2.69009 3.38968 0.5 6.99564 0.5C9.76131 0.5 11.7401 1.29445 13.6655 2.85363L13.2808 3.3684C12.8215 3.98352 11.9729 4.13869 11.3268 3.72985C9.92145 2.84062 8.49122 2.44386 6.94134 2.44386C4.47386 2.44386 2.90189 3.81255 2.90189 5.56406C2.90189 7.39735 3.87747 8.41109 8.05313 9.31426Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M30.6847 14.8033H30.5799L23.9121 4.2726V19.0632C23.9121 19.6959 23.4354 20.2091 22.8478 20.2091H21.8989V0.500175H22.688C23.502 0.500175 24.2618 0.937918 24.7136 1.66622L30.658 11.2555L36.6025 1.66622C37.0551 0.937918 37.8149 0.500175 38.6289 0.500175H39.418V20.2091H38.4159C37.8283 20.2091 37.3525 19.6959 37.3525 19.0632V4.24489L30.6847 14.8033Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M53.6246 3.07198L49.0654 13.3459C49.5531 13.1096 50.3471 13.0527 51.4493 13.0527H58.0259L53.6246 3.07198ZM63.5068 20.2091H61.8868C61.4405 20.2091 61.0374 19.9444 60.857 19.5325L58.8838 15.0371H50.5651C48.8193 15.0892 47.9811 15.8409 47.4258 17.0898L46.3386 19.5372C46.1573 19.9463 45.7551 20.2091 45.3106 20.2091H43.7978L52.6276 0.500175H54.677L63.5068 20.2091Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M72.1678 10.552V2.55604H77.8866C80.8785 2.55604 82.6257 4.02028 82.6257 6.46992C82.6257 9.03235 80.6404 10.552 77.8596 10.552H72.1678ZM79.7137 12.1568C82.6257 11.5938 84.7441 9.6794 84.7441 6.38486C84.7441 2.83799 82.1233 0.500175 78.0456 0.500175H70.0764V20.2091H72.1678V12.5515H77.4632L82.4343 19.6347C82.6886 19.997 83.0877 20.2091 83.5119 20.2091H85.4056L79.7137 12.1568Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M227.65 10.552V2.55604H233.369C236.36 2.55604 238.108 4.02028 238.108 6.46992C238.108 9.03235 236.122 10.552 233.342 10.552H227.65ZM235.196 12.1568C238.108 11.5938 240.227 9.6794 240.227 6.38486C240.227 2.83799 237.605 0.500175 233.528 0.500175H225.558V20.2091H227.65V12.5515H232.945L237.917 19.6347C238.17 19.997 238.569 20.2091 238.995 20.2091H240.887L235.196 12.1568Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M98.565 20.2091H96.3351V2.55508H91.2982C90.4628 2.55508 89.7854 1.87171 89.7854 1.02776V0.500175H105.115V1.02776C105.115 1.87171 104.437 2.55508 103.602 2.55508H98.565V20.2091Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M123.405 2.55508H113.747V10.5052C113.747 10.5052 114.488 9.59434 115.923 9.59434H123.647V10.0933C123.647 10.9372 123.013 11.6215 122.23 11.6215H116.187C114.84 11.6215 113.747 12.799 113.747 14.2518V20.2091H111.684V0.500175H124.823V1.0268C124.823 1.87171 124.188 2.55508 123.405 2.55508Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M130.298 0.500175H132.492V18.1542H141.93C142.762 18.1542 143.437 18.8386 143.437 19.6815V20.2091H130.298V0.500175Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M157.644 2.48789C153.228 2.48789 150.08 5.97263 150.08 10.3279C150.08 14.6831 153.283 18.2223 157.699 18.2223C162.116 18.2223 165.263 14.7376 165.263 10.3824C165.263 6.02622 162.06 2.48789 157.644 2.48789ZM157.644 20.2091C151.765 20.2091 147.817 15.6635 147.817 10.3824C147.817 5.10121 151.819 0.500175 157.699 0.500175C163.579 0.500175 167.526 5.04669 167.526 10.3279C167.526 15.609 163.524 20.2091 157.644 20.2091Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M185.553 0.500175H185.996L191.366 16.8082L196.694 1.32249C196.853 0.86449 197.285 0.556005 197.772 0.556005H199.279L192.289 20.2091H191.231C190.743 20.2091 190.31 19.8988 190.154 19.4379L185.046 4.37516L179.911 19.4389C179.753 19.8988 179.32 20.2091 178.832 20.2091H177.802L170.811 0.556005H172.403C172.89 0.556005 173.322 0.86449 173.479 1.32249L178.809 16.8082L183.75 1.8013C184.006 1.02536 184.732 0.500175 185.553 0.500175Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M216.242 2.52737H205.86V10.1678C205.86 10.1678 206.689 9.25695 208.181 9.25695H216.5V9.75586C216.5 10.5998 215.824 11.2841 214.989 11.2841H208.521C207.051 11.2841 205.86 12.4884 205.86 13.9746V18.1819H216.381C217.216 18.1819 217.894 18.8663 217.894 19.7102V20.2091H203.659V0.500175H217.754V0.999088C217.754 1.84303 217.077 2.52737 216.242 2.52737Z" fill="currentColor"/>
          </svg>
        </Marquee>
      </Unit>
    </>
  );
}
