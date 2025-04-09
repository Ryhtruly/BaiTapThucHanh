import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/data/user';
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key-for-development';

// POST
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
 
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const safeUser = {
        id: user.id,
        email: user.email
      };

      const token = sign(safeUser, JWT_SECRET, { expiresIn: '1h' });
    
      return NextResponse.json({
        success: true,
        message: 'Đăng nhập thành công',
        token,
        user: safeUser
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác'
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return NextResponse.json({
      success: false,
      message: 'Có lỗi xảy ra khi xử lý yêu cầu'
    }, { status: 500 });
  }
}

//GET
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        message: 'Không tìm thấy token xác thực'
      }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = verify(token, JWT_SECRET) as { id: string; email: string };
      const user = users.find(u => u.id === decoded.id && u.email === decoded.email);
      
      if (!user) {
        return NextResponse.json({
          success: false,
          message: 'Không tìm thấy người dùng'
        }, { status: 404 });
      }
      
      const { password, ...userWithoutPassword } = user;
      
      return NextResponse.json({
        success: true,
        message: 'Người dùng đã xác thực',
        user: userWithoutPassword
      }, { status: 200 });
    } catch (tokenError) {
      return NextResponse.json({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn'
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Lỗi kiểm tra xác thực:', error);
    return NextResponse.json({
      success: false,
      message: 'Có lỗi xảy ra khi xử lý yêu cầu'
    }, { status: 500 });
  }
}
