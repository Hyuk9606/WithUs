using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MyGizmo : MonoBehaviour
{
  public Color _color = Color.yellow;
  public float _radius = 0.3f;
  void OnDrawGiznos()
  {

        // 기즈모 색상 설정
        Gizmos.color = _color;

        // 구 형태의 기즈모 생성
        Gizmos.DrawSphere(transform.position, _radius);


  }
}
