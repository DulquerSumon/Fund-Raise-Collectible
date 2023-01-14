import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { IntegratingProvider } from "../components/AppContext";
import Link from "next/link";

export default function Home() {
  const active = true;
  //   const { connect, retrieve, active } = IntegratingProvider();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        {/* <h1>Integrating</h1> */}
        {/* <div className={styles.main}> */}
        <div className="bg-red-400">
          {active ? (
            "Connected!"
          ) : (
            <button onClick={() => connect()}>Connect</button>
          )}
          <Link href="./retriev">
            <p>go to retreive</p>
          </Link>
          <Link href="./execute">
            <p>go to execute</p>
          </Link>
        </div>
      </main>
    </>
  );
}
