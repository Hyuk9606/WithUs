using System;
using UnityEngine;
using System.Collections;
using System.Net;
using Paroxe.PdfRenderer.WebGL;
using UnityEngine.UI;
using Photon.Pun;



namespace Paroxe.PdfRenderer.Examples
{
    public class WebGL_API_Usage : MonoBehaviour
    {
        // public RawImage m_RawImage;
        public Material meterial;
        public string url;
        public int totalPage;
        public PhotonView pv;
        
        public string user;
        public string provider;
        public string class1Provider;
        public string class2Provider;
        public string class3Provider;
        public int class1Idx;
        public int class2Idx;
        public int class3Idx;
        public int idx;
        private void Start()
        {
            class1Provider = "";
            class1Idx = 0;
            
            class2Provider = "";
            class2Idx = 0;
            
            class3Provider = "";
            class3Idx = 0;

            // pv = GetComponent<PhotonView>();

            // nextBtn = GameObject.FindGameObjectWithTag("NextBtn").GetComponent<Button>();
            // prevBtn = GameObject.FindGameObjectWithTag("PrevBtn").GetComponent<Button>();
            //
            // nextBtn.onClick.AddListener(NextPage);
            // prevBtn.onClick.AddListener(PrevPage);
        }
        private void GetUserId(string userId)
        {
            user = userId;
            // print(" login user id : "+user);
        }

        private void GetUrl(string pdfUrl)
        {
            url = pdfUrl;
        }
        
        private void GetProviderId(string providerId)
        {
            provider = providerId;
            // print("provider : " + provider);
            // pv = GameObject.Find(url).GetComponent<PhotonView>();
            pv.RPC("setProvider", RpcTarget.All, url, provider);
        }

        private void Update()
        {
            if ((class1Provider != "" && class1Provider.Equals(user)) ||
                (class2Provider != "" && class2Provider.Equals(user)) ||
                (class3Provider != "" && class3Provider.Equals(user)))
                {
                    if (Input.GetKeyDown(KeyCode.P)) // 다음 페이지 이동
                    {
                        // pv = GameObject.Find(url).GetComponent<PhotonView>();
                        pv.RPC("setNext", RpcTarget.All, url);
                        // pv.RPC("CallPdf", RpcTarget.All, url, idx);
                    }
                    if (Input.GetKeyDown(KeyCode.O)) // 이전 페이지 이동
                    {
                        // pv = GameObject.Find(url).GetComponent<PhotonView>();
                        pv.RPC("setPrev", RpcTarget.All, url);
                        // pv.RPC("CallPdf", RpcTarget.All, url, idx);

                    }
                    if (Input.GetKeyDown(KeyCode.Y)) // pdf 종료
                    {
                        // pv = GameObject.Find(url).GetComponent<PhotonView>();
                        pv.RPC("RemovePdf", RpcTarget.All, url);
                        pv.RPC("setProvider",RpcTarget.All, url, "");
                        pv.RPC("InitialIdx",RpcTarget.All, url);
                    }
                }
        }

        [PunRPC]
        private void setNext(string className)
        {
            // pv = GameObject.Find(className).GetComponent<PhotonView>();
            if ("class1".Equals(className))
            {
                class1Idx += 1;
                // print("class1Idx "+class1Idx);
                pv.RPC("CallPdf", RpcTarget.All, className, class1Idx);
            }else if ("class2".Equals(className))
            {
                class2Idx += 1;
                // print("class2Idx "+class2Idx);
                pv.RPC("CallPdf", RpcTarget.All, className, class2Idx);
            }else if ("class3".Equals(className))
            {
                class3Idx += 1;
                // print("class3Idx "+class3Idx);
                pv.RPC("CallPdf", RpcTarget.All, className, class3Idx);
            }
        }
        [PunRPC]
        private void setPrev(string className)
        {
            // print("==== prev page ====");
            // print("className "+className);
            // pv = GameObject.Find(className).GetComponent<PhotonView>();
            if ("class1".Equals(className))
            {
                if (class1Idx > 0 && class1Idx < totalPage)
                {
                    class1Idx -= 1;
                    // print("class1Idx "+class1Idx);
                    pv.RPC("CallPdf", RpcTarget.All, className, class1Idx);
                }
            }else if ("class2".Equals(className))
            {
                if (class2Idx > 0 && class1Idx < totalPage)
                {
                    class2Idx -= 1;
                    // print("class2Idx "+class2Idx);
                    pv.RPC("CallPdf", RpcTarget.All, className, class2Idx);
                }
            }else if ("class3".Equals(className))
            {
                if (class3Idx > 0 && class1Idx < totalPage)
                {
                    class3Idx -= 1;
                    // print("class3Idx "+class3Idx);
                    pv.RPC("CallPdf", RpcTarget.All, className, class3Idx);
                }
            }
        }
        private void StartShare(int page)
        {
            // print("==== 파일공유 ====");
            totalPage = page;
            // Debug.Log("총 페이지 : "+totalPage);
            // pv = GameObject.Find(url).GetComponent<PhotonView>();
            
            pv.RPC("CallPdf", RpcTarget.All, url, 0);
        }

        [PunRPC]
        private void RemovePdf(string className)
        {
            // print("==== pdf 공유 중지 ====");
            // pv = GameObject.Find(className).GetComponent<PhotonView>();
            meterial = GameObject.Find(className).GetComponent<MeshRenderer>().materials[0];
            meterial.SetTexture("_MainTex", null);
            provider = "";
            pv.RPC("setProvider",RpcTarget.All, className, provider);
            pv.RPC("InitialIdx",RpcTarget.All, className);
            // idx = 0;
        }

        [PunRPC]
        private void InitialIdx(string className)
        {
            // print("==== idx 초기화 ====");
            // print("idx 초기화 className : " + className);
            totalPage = 0;
            if ("class1".Equals(className))
            {
                class1Idx = 0;
            }else if ("class2".Equals(className))
            {
                class2Idx = 0;
            }else if ("class3".Equals(className))
            {
                class3Idx = 0;
            }
        }

        [PunRPC]
        private void setProvider(string className, string providerName)
        {
            // print("====setProvider====");
            // print("provider name : "+providerName);
            // print("className : "+className);
            if ("class1".Equals(className))
            {
                class1Provider = providerName;
                print("class1Provider : "+class1Provider);
            }else if ("class2".Equals(className))
            {
                class2Provider = providerName;
                print("class2Provider : "+class2Provider);
            }else if ("class3".Equals(className))
            {
                class3Provider = providerName;
                print("class3Provider : "+class3Provider);
            }
        }
        
        [PunRPC]
        private IEnumerator CallPdf(string className, int idx)
        {
            // print("==== call pdf ====");
            PDFJS_Promise<PDFDocument> documentPromise = PDFDocument.LoadDocumentFromUrlAsync("https://ssafy-withus.s3.ap-northeast-2.amazonaws.com/"+className+".pdf");

            // "https://ssafy-withus.s3.ap-northeast-2.amazonaws.com/Documentation.pdf"
            // PDFJS_Promise<PDFDocument> documentPromise = PDFDocument.LoadDocumentFromBytesAsync(pdfDocument.DocumentBuffer);;
            while (!documentPromise.HasFinished)
            {
                yield return null;
            }

            if (!documentPromise.HasSucceeded)
            {
                // Debug.Log("Fail: documentPromise");
                yield break;
            }

            Debug.Log("Success: documentPromise");
            PDFDocument document = documentPromise.Result;

            PDFJS_Promise<PDFPage> pagePromise = document.GetPageAsync(idx);

            while (!pagePromise.HasFinished)
                yield return null;

            if (!pagePromise.HasSucceeded)
            {
                // Debug.Log("Fail: pagePromise");
                yield break;
            }

            // Debug.Log("Success: pagePromise");

            PDFPage page = pagePromise.Result;

            PDFJS_Promise<Texture2D> renderPromise = PDFRenderer.RenderPageToTextureAsync(page, (int)page.GetPageSize().x, (int)page.GetPageSize().y);

            while (!renderPromise.HasFinished)
                yield return null;

            if (!renderPromise.HasSucceeded)
            {
                // Debug.Log("Fail: pagePromise");

                yield break;
            }

            Texture2D renderedPageTexture = renderPromise.Result;
            meterial = GameObject.Find(className).GetComponent<MeshRenderer>().materials[0];
            meterial.SetTexture("_MainTex", renderedPageTexture);
            // ((RectTransform)m_RawImage.transform).sizeDelta = new Vector2(renderedPageTexture.width, renderedPageTexture.height);
            // m_RawImage.texture = renderedPageTexture;
        }

        public void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info)
        {
            throw new NotImplementedException();
        }
    }
}
